import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 2000;

function clean(value: unknown, max = MAX) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot. Bots fill this; humans never see it.
  if (clean(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const reason = clean(body.reason, 80);
  const message = clean(body.message, MAX);

  if (!name || !email || !reason || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const to = site.email;
  const subject = `Website Inquiry: ${reason}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Reason: ${reason}`,
    '',
    message,
  ].join('\n');

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL?.trim() || 'Novice Group Dermatology <noreply@novicegroupderm.com>',
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!sent.ok) {
      return NextResponse.json({ ok: false, error: 'Could not send message' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // No mail provider key yet: FormSubmit delivers to the practice inbox.
  // The first live send asks that inbox to confirm the destination.
  const dest = encodeURIComponent(to);
  const sent = await fetch(`https://formsubmit.co/ajax/${dest}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || 'Not provided',
      reason,
      message,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
    }),
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: 'Could not send message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
