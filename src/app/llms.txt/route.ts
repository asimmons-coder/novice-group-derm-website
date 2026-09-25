import { site, providers, services, faqs, booking } from '@/lib/site';

export const dynamic = 'force-static';

// A plain-text brief for AI assistants (llmstxt.org). Built entirely from
// site.ts so it can never drift from what the pages say.
export function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a private, family-owned dermatology practice in ${site.address.city}, Michigan, offering medical, cosmetic, and surgical dermatology plus in-house dermatopathology, so the doctor who examines your skin can also read your biopsy.`,
    '',
    '## Practice facts',
    '',
    `- Address: ${site.address.full}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours}`,
    `- Appointments: call ${site.phone}${booking.isLive ? ` or book online at ${booking.url}` : ' or send a request through the contact page'}`,
    `- Insurance accepted includes: ${site.insurance.join(', ')}`,
    `- Hospital affiliations: ${site.affiliations.join('; ')}`,
    '',
    '## Providers',
    '',
    ...providers.map((p) => `- ${p.name}: ${p.role}. ${p.bio}`),
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}): ${s.blurb}`),
    '',
    '## Common questions',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Key pages',
    '',
    `- [Our dermatologists](${url('/our-story')})`,
    `- [New patient information and insurance](${url('/patient-resources')})`,
    `- [Skin shop](${url('/skin-shop')})`,
    `- [Contact and directions](${url('/contact')})`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
