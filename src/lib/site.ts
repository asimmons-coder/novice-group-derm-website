export const site = {
  name: 'Novice Group Dermatology',
  legal: 'Novice Aesthetics and Dermatology PLLC',
  tagline: 'Skin health, elevated.',
  supportingLine: 'Three generations. One standard of care.',
  address: {
    street: '4120 West Maple Road, Suite 206',
    city: 'Bloomfield Hills',
    state: 'MI',
    zip: '48301',
    full: '4120 West Maple Road, Suite 206, Bloomfield Hills, MI 48301',
  },
  phone: '(248) 932-3376',
  phoneRaw: '+12489323376',
  email: 'Skin@novicegroupderm.com',
  hours: 'Monday–Friday 8:30 AM – 5:00 PM',
  hoursShort: 'Mon–Fri · 8:30 – 5:00',
  affiliations: [
    'Corewell Health William Beaumont University Hospital (Royal Oak)',
    'Corewell Health Trenton Hospital',
  ],
  insurance: [
    'Aetna',
    'Humana',
    'United Healthcare',
    'Blue Cross Blue Shield',
    'Cigna',
    'Medicare',
    'Medicaid',
    'Priority Health',
  ],
  url: 'https://novicegroupderm.com',
};

export const navLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Services', href: '/services' },
  { label: 'Providers', href: '/our-story#providers' },
  { label: 'Skin Shop', href: '/skin-shop' },
  { label: 'Patient Resources', href: '/patient-resources' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  {
    slug: 'medical-dermatology',
    name: 'Medical Dermatology',
    short: 'Medical',
    accent: 'sage' as const,
    blurb:
      'From eczema to skin cancer screenings, the foundation of our practice is rigorous, evidence-based medical care.',
  },
  {
    slug: 'cosmetic-aesthetics',
    name: 'Cosmetic & Aesthetics',
    short: 'Cosmetic',
    accent: 'blush' as const,
    blurb:
      'Three decades of injection artistry. Subtle, natural results from one of the most experienced cosmetic dermatologists practicing today.',
  },
  {
    slug: 'surgical-dermatology',
    name: 'Surgical Dermatology',
    short: 'Surgical',
    accent: 'charcoal' as const,
    blurb:
      'Mohs coordination, skin cancer surgery, mole and cyst removal — performed with precision and a focus on cosmetic outcomes.',
  },
  {
    slug: 'dermatopathology',
    name: 'Dermatopathology',
    short: 'Pathology',
    accent: 'gold' as const,
    blurb:
      'Two of our dermatologists are fellowship-trained pathologists. The doctor who examines your skin reads your biopsy.',
  },
];

export const providers = [
  {
    slug: 'fred-novice',
    name: 'Dr. Fred M. Novice, MD',
    role: 'Founder · Board-Certified Dermatologist & Dermatopathologist',
    yearsExperience: '42+',
    headline: 'The patriarch. Trusted authority. Decades of cosmetic mastery.',
    bio: 'Dr. Fred Novice founded the practice after completing his dermatology residency at Henry Ford Hospital, where he served as Chief Resident, and a dermatopathology fellowship at the University of Oklahoma. With more than 30 years of Botox and filler experience, he is among the most experienced cosmetic injectors practicing today, and has trained colleagues around the world in advanced injection techniques.',
    credentials: [
      'MD, University of Toronto (1983)',
      'Dermatology Residency, Henry Ford Hospital (Chief Resident)',
      'Dermatopathology Fellowship, University of Oklahoma',
      'Dual Board-Certified: Dermatology + Dermatopathology',
      'Fellow, Royal College of Physicians and Surgeons of Canada',
      'Author, Handbook of Genetic Skin Disorders (WB Saunders, 1994)',
      'Metro Detroit\u2019s Best Dermatologist, Styleline Magazine (10 consecutive years)',
    ],
    specialties: ['Botox & Dysport', 'Dermal Fillers', 'Dermatopathology', 'Skin Cancer'],
  },
  {
    slug: 'karlee-novice',
    name: 'Dr. Karlee D. Novice, MD',
    role: 'Board-Certified Dermatologist',
    yearsExperience: '11+',
    headline: 'The bridge between deep medical knowledge and patient-friendly education.',
    bio: 'Dr. Karlee Novice trained at Henry Ford Hospital, where she served as Chief Resident from 2015 to 2018. She brings an evidence-based, approachable style to every visit, with multiple peer-reviewed publications on topics ranging from drug-induced phototoxicity to chemical peels and skin cancer education.',
    credentials: [
      'BA magna cum laude, Lehigh University',
      'MD cum laude, Loyola Stritch School of Medicine (Distinction in Research)',
      'Preliminary Internal Medicine, Loyola',
      'Dermatology Residency, Henry Ford Hospital (Chief Resident, 2015–2018)',
      'Board-Certified, Fellow of the American Academy of Dermatology',
      'Multiple peer-reviewed publications',
    ],
    specialties: ['Medical Dermatology', 'Cosmetic', 'Pediatric Skin', 'Skin Cancer'],
  },
  {
    slug: 'taylor-novice',
    name: 'Dr. Taylor Novice, MD, MBA',
    role: 'Board-Certified Dermatologist & Dermatopathologist',
    yearsExperience: 'Newest generation',
    headline: 'Clinical excellence meets business innovation. The next generation.',
    bio: 'Dr. Taylor Novice represents the third generation of dermatologists in the Novice family. After earning a BA summa cum laude from Duke and an MD from the University of Michigan, she completed an MBA at Michigan Ross with a focus on healthcare innovation, and trained in both dermatology and dermatopathology. As Academic Chief Resident at Henry Ford, she received the Outstanding Resident Award across the entire health system.',
    credentials: [
      'BA summa cum laude, Duke University (Phi Beta Kappa)',
      'MD, University of Michigan Medical School (Alpha Omega Alpha)',
      'MBA, Michigan Ross School of Business (healthcare innovation)',
      'Dermatology Residency, Henry Ford Hospital (Academic Chief Resident)',
      'Outstanding Resident Award, Henry Ford Health System',
      'Dermatopathology Fellowship, University of Michigan',
    ],
    specialties: ['Medical Dermatology', 'Dermatopathology', 'Cosmetic', 'Research'],
  },
  {
    slug: 'erin-koppelman',
    name: 'Erin Koppelman, MSN, APRN, NP-C',
    role: 'Board-Certified Nurse Practitioner',
    yearsExperience: '13+ years',
    headline: 'Hospital-trained clinician with a passion for dermatology.',
    bio: 'Erin is a board-certified Nurse Practitioner who earned her Bachelor of Science in Nursing at the University of Michigan and her Master of Science in Nursing in Adult Primary Care at Wayne State University. Before specializing in dermatology, she practiced hospital-based medicine in both cardiology and intensive care. She is a member of the American Academy of Nurse Practitioners, Michigan Council of Nurse Practitioners, and the National Academy of Dermatology Nurse Practitioners.',
    credentials: [
      'BSN, University of Michigan School of Nursing (2005)',
      'MSN Adult Primary Care, Wayne State University (2012)',
      'Board-Certified Nurse Practitioner (NP-C)',
      'AANP, MCNP, NADNP member',
    ],
    specialties: ['General Dermatology', 'Skin Screenings', 'Cosmetic Treatments', 'Patient Education'],
  },
];

export const stats = [
  { value: '30+', label: 'Years Botox Experience', sublabel: 'Dr. Fred Novice' },
  { value: '3', label: 'Board-Certified Dermatologists', sublabel: 'One family' },
  { value: 'In-House', label: 'Dermatopathology', sublabel: 'Same doctor, same diagnosis' },
  { value: '4.8', label: 'Patient Rating', sublabel: '318 Google reviews' },
];
