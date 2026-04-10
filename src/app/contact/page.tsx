import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Visit Us',
  description:
    'Schedule an appointment at Novice Group Dermatology in Bloomfield Hills, Michigan. Call (248) 932-3376 or send a message.',
};

const contactItems = [
  {
    icon: MapPin,
    title: 'Visit',
    body: site.address.full,
    href: 'https://maps.google.com/?q=4120+West+Maple+Road,+Bloomfield+Hills,+MI+48301',
  },
  {
    icon: Phone,
    title: 'Call',
    body: site.phone,
    href: `tel:${site.phoneRaw}`,
  },
  {
    icon: Mail,
    title: 'Email',
    body: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    title: 'Hours',
    body: site.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        primary="Let&rsquo;s get you"
        accent="on the calendar."
        description="New patients welcome. Most major insurance accepted. Call us, send a message, or stop by — we look forward to meeting you."
      />

      <Section bg="cream" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="bg-warm-white border border-sand rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 className="font-display text-3xl text-charcoal mb-2">Send a message</h2>
              <p className="text-warm-gray mb-8">
                For appointment requests or general questions. We&rsquo;ll respond
                within one business day.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Info */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={item.title}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex gap-5 items-start bg-warm-white border border-sand rounded-2xl p-6 hover:border-sage transition-colors"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-light text-sage shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-gray mb-1">
                        {item.title}
                      </p>
                      <p className="text-charcoal leading-relaxed">{item.body}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-light border border-sand">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.428!2d-83.244!3d42.5478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDMyJzUyLjEiTiA4M8KwMTQnMzguNCJX!5e0!3m2!1sen!2sus!4v1700000000000"
                className="w-full h-full border-0"
                loading="lazy"
                title="Map to Novice Group Dermatology"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
