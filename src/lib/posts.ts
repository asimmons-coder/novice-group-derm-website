import { providers } from '@/lib/site';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  authorSlug: string;
  image: string;
  paragraphs: string[];
};

export const posts: Post[] = [
  {
    slug: 'in-house-dermatopathology-bloomfield-hills',
    title: 'Why it matters that your dermatologist reads the slides',
    description:
      'At Novice Group in Bloomfield Hills, a lab processes biopsy slides and Dr. Fred or Dr. Taylor Novice reads them. Why that clinicopathologic correlation matters.',
    date: '2026-08-24',
    authorSlug: 'taylor-novice',
    image: '/images/lab-microscope.jpg',
    paragraphs: [
      'When most dermatology offices take a biopsy, the sample is sent to a laboratory. A pathologist who has never seen your skin writes the report. That arrangement can work. It leaves out context the examining doctor already has.',
      'At Novice Group Dermatology in Bloomfield Hills, a lab still processes the slides. We do not run a pathology laboratory in the office. What is different is who reads them after they come back.',
      'Dr. Fred Novice and Dr. Taylor Novice are fellowship-trained dermatopathologists. After the lab prepares the slides, the doctor who examined your skin can sit at the microscope and read them.',
      'That pairing is clinicopathologic correlation. The physician already knows how the lesion looked, how it felt, and how it changed. That context helps when the microscope shows something that could be read more than one way.',
      'Having two fellowship-trained dermatopathologists in a private office is uncommon. Many excellent practices send every specimen out and never see the slide. We keep the reading step with the doctors who know you.',
      'If a biopsy is recommended, we will explain why, what we are looking for, and how you will hear the result. Questions are welcome. Call the office if you are waiting on a result and want to talk it through.',
    ],
  },
  {
    slug: 'skin-cancer-screening-what-to-expect',
    title: 'What to expect at a full-body skin cancer screening',
    description:
      'A practical walkthrough of a full-body skin exam in Bloomfield Hills: how to prepare, what we look at, and when a biopsy or off-site Mohs may be next.',
    date: '2026-08-24',
    authorSlug: 'karlee-novice',
    image: '/images/office-art-hallway.jpg',
    paragraphs: [
      'A full-body skin cancer screening is a careful look at your skin from scalp to toes. It is a routine medical visit, not a test you have to study for.',
      'You will undress to your underwear. A gown is available, and we examine one area at a time so you can stay as covered as you like. The visit is straightforward and private.',
      'We look at moles, freckles, and any spot you are worried about. The dermatologist may map moles that deserve follow-up. If a lesion looks uncertain, we may recommend a small biopsy the same day or at a later visit. That is a sample, not a conclusion.',
      'People come in for many reasons: a new or changing spot, fair skin that burns easily, a family history of melanoma or other skin cancer, or simply being over 50. You do not need a crisis to book a screening.',
      'If a skin cancer is found and Mohs surgery is the right next step, we coordinate that care off-site. We stay involved so you know who is doing what and why.',
      'New patients are welcome. Call or text (248) 826-2536 to schedule a screening at our Bloomfield Hills office.',
      'Bring a list of spots you want us to see, including ones under the hairline or on the back. If you have prior biopsy records, those help too.',
    ],
  },
  {
    slug: 'natural-looking-botox-bloomfield-hills',
    title: 'What natural-looking Botox actually means',
    description:
      'Natural-looking Botox means rested, not frozen. Dr. Fred Novice on subtlety, anatomy, Dysport, and why a consultation comes first in Bloomfield Hills.',
    date: '2026-08-24',
    authorSlug: 'fred-novice',
    image: '/images/cosmetic-injection.jpg',
    paragraphs: [
      'Natural-looking Botox is not a marketing phrase. It means you still look like yourself. The goal is a rested expression, not a frozen one.',
      'Neuromodulators such as Botox and Dysport relax specific muscles that crease the skin. Used with restraint, they can soften lines while you keep the movements that make a face yours.',
      'Dr. Fred Novice has more than 30 years of Botox and filler experience. That time is spent on anatomy: which muscle lifts, which one pulls, and how a small change in one area affects another.',
      'Subtlety starts before the first injection. A consultation comes first. We talk through what bothers you, what we see, and what we will not treat. There is no obligation to treat on the same day.',
      'Faces are not templates. Placement and product choice depend on your muscle pattern and your goals. We will not quote a one-size plan in an article, and we will not promise how long a result will last.',
      'If you are curious whether Botox, Dysport, or another option fits, start with a conversation at our Bloomfield Hills office. Bring photos of yourself at rest and smiling if that helps you explain what you want.',
      'Good cosmetic work should be hard to spot. Friends may say you look well-rested. That is the standard we aim for.',
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostAuthor(post: Post) {
  const author = providers.find((provider) => provider.slug === post.authorSlug);
  if (!author) {
    throw new Error(`Unknown authorSlug: ${post.authorSlug}`);
  }
  return author;
}

export function getAuthorLastName(author: { name: string }): string {
  const withoutSuffix = author.name.replace(/,.+$/, '').trim();
  const parts = withoutSuffix.split(/\s+/);
  return parts[parts.length - 1] ?? withoutSuffix;
}

export function formatPostDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
