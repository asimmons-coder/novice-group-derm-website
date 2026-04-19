import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';
import { ArrowLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const LAB_IMAGE =
  'https://storage.googleapis.com/boon-public-assets/Screenshot%202026-04-08%20at%204.32.23%E2%80%AFPM.png';

export function LabStory() {
  return (
    <Section bg="warm-white" padding="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <Reveal className="relative">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl bg-sand">
            <Image
              src={LAB_IMAGE}
              alt="In-house dermatopathology laboratory at Novice Group"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover grayscale"
            />
          </div>

          <div
            aria-hidden
            className="absolute -top-10 -left-10 w-40 h-40 bg-sage/10 rounded-full blur-3xl opacity-60"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -right-10 w-60 h-60 bg-gold/10 rounded-full blur-3xl opacity-60"
          />

          <Reveal
            delay={0.4}
            className="absolute top-8 -right-4 md:right-[-5%] bg-warm-white p-5 rounded-2xl shadow-xl border border-sand max-w-[220px] z-20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center">
                <CheckCircle2 className="text-sage" size={16} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal">
                In-House Lab
              </span>
            </div>
            <p className="text-[11px] text-warm-gray leading-snug">
              Direct clinical correlation for the highest diagnostic accuracy.
            </p>
          </Reveal>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionLabel>The Diagnostic Edge</SectionLabel>
          <SignatureHeadline
            primary="Precision diagnosis."
            accent="From the source."
            size="lg"
            className="mb-8"
          />
          <div className="space-y-6 text-lg text-warm-gray leading-relaxed mb-10 max-w-xl">
            <p>
              At most practices, skin biopsies travel to remote laboratories
              where the reading pathologist never meets the patient. At Novice
              Group, the same dermatologist who examines your skin reads your
              slides under the microscope.
            </p>
            <p>
              Dr. Fred Novice and Dr. Taylor Novice are both fellowship-trained
              dermatopathologists. Direct clinical-to-pathologic correlation
              means faster results and unmatched accuracy when diagnosing skin
              cancers and complex inflammatory conditions.
            </p>
          </div>
          <ArrowLink href="/services/dermatopathology">
            Learn about our lab
          </ArrowLink>
        </Reveal>
      </div>
    </Section>
  );
}
