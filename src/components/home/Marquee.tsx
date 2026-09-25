const items = [
  'Skin Cancer Screening',
  'Acne',
  'Eczema',
  'Psoriasis',
  'Rosacea',
  'Botox & Dysport',
  'Dermal Fillers',
  'Mole Removal',
  'In-House Dermatopathology',
  'Chemical Peels',
  'Microneedling',
  'Laser & Light',
];

// Endless ribbon of what the practice treats. The list renders twice so the
// -50% translate loops seamlessly; the second copy is hidden from screen readers.
export function Marquee() {
  return (
    <section
      aria-label="Conditions and treatments"
      className="pause-on-hover relative overflow-hidden bg-cream border-y border-sand py-7 md:py-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-cream to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-cream to-transparent"
      />
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, idx) => (
              <li key={item} className="flex items-center">
                <span className="font-accent text-3xl md:text-5xl text-charcoal/85 whitespace-nowrap px-6 md:px-10">
                  {item}
                </span>
                <CellGlyph variant={idx % 3} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

const glyphColors = ['var(--color-sage)', 'var(--color-blush)', 'var(--color-gold)'];

function CellGlyph({ variant }: { variant: number }) {
  const color = glyphColors[variant];
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 shrink-0">
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="3.5" fill={color} />
    </svg>
  );
}
