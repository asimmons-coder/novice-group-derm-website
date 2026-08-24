'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  company: string;
}

const reasons = [
  'New patient consultation',
  'Cosmetic consultation',
  'Skin cancer screening',
  'Returning patient',
  'General question',
  'Other',
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: { company: '' },
  });

  const onSubmit = async (data: FormData) => {
    setSendError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        setSendError(json?.error || 'Could not send your message. Please call the office.');
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setSendError('Could not send your message. Please call the office.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-sage mb-6">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-2">Message received</h3>
        <p className="text-warm-gray max-w-sm mx-auto">
          Thank you for reaching out. A member of our team will respond within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-xs uppercase tracking-widest text-sage font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            {...register('name', { required: 'Required' })}
            className="form-input"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register('email', {
              required: 'Required',
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' },
            })}
            className="form-input"
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Phone">
        <input
          type="tel"
          {...register('phone')}
          className="form-input"
          placeholder="(248) 555-0100"
        />
      </Field>

      <Field label="Reason for visit" error={errors.reason?.message}>
        <select
          {...register('reason', { required: 'Required' })}
          className="form-input"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          {...register('message', { required: 'Required' })}
          className="form-input resize-none"
          placeholder="Tell us briefly what you would like to discuss."
        />
      </Field>

      {sendError && <p className="text-sm text-blush">{sendError}</p>}

      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" withArrow disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 14px 18px;
          background: var(--color-cream);
          border: 1px solid var(--color-sand);
          border-radius: 14px;
          font-size: 15px;
          color: var(--color-charcoal);
          font-family: var(--font-sans);
          transition: border-color 0.2s;
        }
        .form-input::placeholder {
          color: var(--color-taupe);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-sage);
          background: var(--color-warm-white);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-warm-gray mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-blush">{error}</p>}
    </div>
  );
}
