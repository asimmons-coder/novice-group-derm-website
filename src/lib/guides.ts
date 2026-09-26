import { site } from '@/lib/site';

// Patient guides to common conditions and treatments. Content is deliberately
// conservative: mainstream dermatology only (the kind found on AAD patient
// pages), no statistics, prices, dosing, or outcome promises, and no practice
// claims beyond what site.ts states.

export interface GuideListItem {
  term: string;
  detail: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  // A functional checklist (like the ABCDEs) rendered as a quiet term/detail list.
  list?: GuideListItem[];
}

export interface Guide {
  slug: string;
  kind: 'condition' | 'treatment';
  name: string;
  // How the guide's subject reads mid-sentence, e.g. "about moles."
  topic: string;
  label: string;
  primary: string;
  accent: string;
  title: string;
  metaDescription: string;
  summary: string;
  answer: string;
  sections: GuideSection[];
  faqs: Array<{ question: string; answer: string }>;
  services: string[];
  providers: string[];
  cta: { primary: string; accent: string; description: string };
}

export function guidePath(guide: Pick<Guide, 'kind' | 'slug'>) {
  return `/${guide.kind === 'condition' ? 'conditions' : 'treatments'}/${guide.slug}`;
}

export const guideDisclaimer =
  'This page is general information, not medical advice. For advice about your own skin, please talk with a dermatologist or other qualified provider.';

export const guides: Guide[] = [
  {
    slug: 'skin-cancer-screening',
    kind: 'condition',
    name: 'Skin Cancer Screening',
    topic: 'skin cancer screening',
    label: 'Skin Guide',
    primary: 'Skin cancer screening',
    accent: 'in Bloomfield Hills.',
    title: 'Skin Cancer Screening in Bloomfield Hills, MI',
    metaDescription:
      'What happens at a full-body skin check, who should get one, and how to check your own skin, from the dermatologists at Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'What happens at a full-body skin check, who benefits from one, and how to watch your own skin between visits.',
    answer:
      'A skin cancer screening is a head-to-toe exam of your skin by a trained provider, looking for spots that could be skin cancer or could turn into one. At Novice Group Dermatology in Bloomfield Hills, a board-certified dermatologist or our nurse practitioner does the exam, and biopsies can be read in-house by our dermatopathologists.',
    sections: [
      {
        heading: 'What happens at a skin check?',
        paragraphs: [
          'You change into a gown, and your provider looks over your skin from your scalp to the soles of your feet, including places the sun rarely reaches, like between your toes and under your nails. Spots that deserve a closer look are checked with a dermatoscope, a handheld magnifying light that shows patterns beneath the surface of the skin.',
          'It helps to point out anything that is new, changing, itchy, or bleeding. If a spot looks suspicious, your provider may recommend a biopsy. The area is numbed, a small sample is removed, and the tissue is examined under a microscope to make a diagnosis.',
        ],
      },
      {
        heading: 'What are the main types of skin cancer?',
        paragraphs: [
          'The most common types are basal cell carcinoma and squamous cell carcinoma. They usually appear on skin that gets a lot of sun, such as the face, ears, neck, scalp, and hands, and can look like a pearly or waxy bump, a rough scaly patch, or a sore that does not heal.',
          'Melanoma is less common but more likely to spread if it is not caught early. It often starts as a new dark spot or a change in an existing mole. Skin cancer of every type is most treatable when it is found early, which is the reason for regular skin checks.',
        ],
      },
      {
        heading: 'Who should get a skin cancer screening?',
        paragraphs: [
          'Anyone can develop skin cancer, whatever their skin tone. Your risk is higher if you have fair skin that burns easily, a history of blistering sunburns or tanning bed use, many moles or unusual-looking moles, a personal or family history of skin cancer, or a weakened immune system.',
          'How often you need a screening depends on those risk factors. Your dermatologist can recommend a schedule that fits your history, whether that is a yearly visit or more frequent checks.',
        ],
      },
      {
        heading: 'How can you check your own skin between visits?',
        paragraphs: [
          'Dermatologists recommend looking over your skin about once a month in good light, using a full-length mirror and a hand mirror for your back, scalp, and the backs of your legs. You are looking for anything new, anything that changes in size, shape, or color, and any spot that itches, bleeds, or will not heal.',
          'Sun protection lowers your risk going forward: a broad-spectrum sunscreen with SPF 30 or higher, shade during the middle of the day, and clothing, hats, and sunglasses that cover your skin.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a skin cancer screening hurt?',
        answer:
          'No. The exam itself is visual. If a biopsy is needed, the area is numbed with a local anesthetic first, so most people feel only a brief pinch from the injection.',
      },
      {
        question: 'How should I prepare for a skin check?',
        answer:
          'Remove nail polish so your nails can be examined, wear your hair loose, and skip heavy makeup if you can. Make a note of any spots that are new or changing so you remember to point them out.',
      },
      {
        question: 'What happens if a spot turns out to be skin cancer?',
        answer:
          'Your provider will explain the diagnosis and the treatment options. Our surgical dermatology team removes skin cancers and coordinates Mohs surgery when it is needed.',
      },
      {
        question: 'Do you accept insurance for skin cancer screenings?',
        answer: `We accept most major plans, including ${site.insurance.slice(0, -1).join(', ')}, and ${site.insurance[site.insurance.length - 1]}. Call our office at ${site.phone} to confirm coverage for your specific plan.`,
      },
    ],
    services: ['medical-dermatology', 'surgical-dermatology', 'dermatopathology'],
    providers: ['fred-novice', 'karlee-novice', 'taylor-novice', 'erin-koppelman'],
    cta: {
      primary: 'Book a skin check',
      accent: 'in Bloomfield Hills.',
      description:
        'New patients welcome, and most major insurance is accepted. Call or send a request to schedule a full-body skin exam.',
    },
  },
  {
    slug: 'moles',
    kind: 'condition',
    name: 'Moles',
    topic: 'moles',
    label: 'Skin Guide',
    primary: 'Mole checks and removal',
    accent: 'in Bloomfield Hills.',
    title: 'Mole Checks and Mole Removal in Bloomfield Hills, MI',
    metaDescription:
      'The ABCDE warning signs of melanoma, when a mole needs a dermatologist, and how moles are checked and removed at Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'The ABCDE warning signs of melanoma, which moles deserve a closer look, and how a mole is checked or removed.',
    answer:
      'A mole is a common growth made of pigment cells called melanocytes. Most moles are harmless, but a new or changing mole can be an early sign of melanoma, a serious skin cancer. At Novice Group Dermatology in Bloomfield Hills, our dermatologists examine and remove moles, and our dermatopathologists read biopsies in-house.',
    sections: [
      {
        heading: 'What are the ABCDE warning signs of melanoma?',
        paragraphs: [
          'Dermatologists use five simple checks to help people spot a mole that needs attention. A mole with any of these signs is worth showing to a dermatologist.',
        ],
        list: [
          { term: 'A is for asymmetry', detail: 'One half of the mole does not match the other half.' },
          { term: 'B is for border', detail: 'The edge is irregular, ragged, notched, or blurred.' },
          {
            term: 'C is for color',
            detail: 'The color is uneven, with shades of tan, brown, or black, and sometimes white, red, or blue.',
          },
          {
            term: 'D is for diameter',
            detail:
              'Melanomas are often larger than 6 millimeters, about the size of a pencil eraser, though they can be smaller.',
          },
          {
            term: 'E is for evolving',
            detail: 'The mole is changing in size, shape, or color, or starts to itch, bleed, or crust.',
          },
        ],
      },
      {
        heading: 'Are most moles harmful?',
        paragraphs: [
          'Most adults have moles, and nearly all of them are harmless. A typical mole is one even color, round or oval, with a smooth, clear border, and it stays much the same over time.',
          'Some people have atypical moles, also called dysplastic nevi, which look irregular without being cancer. Having many moles or several atypical ones raises the chance of developing melanoma, so regular skin checks matter more. Another useful sign is the "ugly duckling": a mole that looks different from all your others.',
        ],
      },
      {
        heading: 'How is a mole checked or removed?',
        paragraphs: [
          'Your dermatologist looks at the mole closely, often with a dermatoscope, a handheld magnifying light. If it looks concerning, the next step is a biopsy. The skin is numbed, and part or all of the mole is removed by shaving it off or cutting it out, then examined under a microscope. At our practice, Dr. Fred and Dr. Taylor Novice are trained in dermatopathology, the microscopic diagnosis of skin disease.',
          'Moles can also be removed when they are irritated by clothing or jewelry or for cosmetic reasons. Any removal leaves a mark, so your dermatologist will talk through what to expect before the procedure.',
        ],
      },
      {
        heading: 'When should you see a dermatologist about a mole?',
        paragraphs: [
          'Make an appointment if a mole shows any of the ABCDE signs, if a new mole appears in adulthood, or if a mole bleeds, itches, hurts, or simply looks different from the rest. You know your skin best, so a mole that worries you is reason enough to have it checked.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I remove a mole at home?',
        answer:
          'Dermatologists advise against it. Cutting, freezing, or using creams on a mole at home can cause infection and scarring, and it can leave a skin cancer undiagnosed. A dermatologist can remove a mole safely and have it examined.',
      },
      {
        question: 'Can a mole come back after it is removed?',
        answer:
          'Sometimes a little pigment returns at the site. If you notice color coming back, let your dermatologist know so they can take a look.',
      },
      {
        question: 'Does having a lot of moles mean I will get skin cancer?',
        answer:
          'No. Having many moles raises your risk, but it does not mean you will develop skin cancer. It does mean regular skin checks and monthly self-exams are especially worthwhile.',
      },
    ],
    services: ['medical-dermatology', 'surgical-dermatology'],
    providers: ['fred-novice', 'taylor-novice', 'erin-koppelman'],
    cta: {
      primary: 'Have a mole',
      accent: 'checked.',
      description:
        'New patients welcome, and most major insurance is accepted. Call or send a request to have a mole or spot examined.',
    },
  },
  {
    slug: 'acne',
    kind: 'condition',
    name: 'Acne',
    topic: 'acne',
    label: 'Skin Guide',
    primary: 'Acne treatment',
    accent: 'in Bloomfield Hills.',
    title: 'Acne Treatment in Bloomfield Hills, MI',
    metaDescription:
      'What causes acne, how dermatologists treat it, and how to lower the risk of scarring, from Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'What causes breakouts, how prescription treatment works, and how to lower the chance of acne scars.',
    answer:
      'Acne is a common skin condition that develops when pores clog with oil and dead skin cells, leading to blackheads, whiteheads, pimples, and sometimes deep, painful bumps. It affects teens and adults alike. At Novice Group Dermatology in Bloomfield Hills, our dermatologists diagnose the type of acne you have and build a treatment plan around it.',
    sections: [
      {
        heading: 'What causes acne?',
        paragraphs: [
          'Four things work together: extra oil, called sebum, dead skin cells that clog the pore, bacteria that live on the skin, and inflammation. Hormones play a large role, which is why acne often starts at puberty and can flare with the menstrual cycle or pregnancy. Genetics, some medications, and hair or skin products that clog pores can contribute too.',
          'Dirt does not cause acne, and scrubbing hard usually makes it worse by irritating the skin. Gentle cleansing twice a day is enough.',
        ],
      },
      {
        heading: 'How is acne treated?',
        paragraphs: [
          'Treatment depends on the type and severity of your acne. Many plans start with topical medicines such as benzoyl peroxide, retinoids, azelaic acid, or topical antibiotics. When acne is more widespread or inflamed, a dermatologist may add an oral antibiotic for a limited time or, for some women, hormonal treatment.',
          'For severe acne, or acne that leaves scars, isotretinoin is an option that requires close monitoring by a dermatologist. Whatever the plan, most acne treatments take several weeks to show a difference, so it helps to give a new routine time before judging it.',
        ],
      },
      {
        heading: 'Can acne scars be prevented?',
        paragraphs: [
          'Treating acne early is the best way to lower the chance of scars, and so is leaving pimples alone. Picking and squeezing push inflammation deeper into the skin.',
          'The flat dark or red marks that linger after a breakout are often not true scars and tend to fade over time, especially with daily sunscreen. When scars have already formed, a dermatologist can talk through the procedures that may improve them.',
        ],
      },
      {
        heading: 'When should you see a dermatologist for acne?',
        paragraphs: [
          'It is worth an appointment if over-the-counter products have not helped after a couple of months, if you have deep, painful bumps or cysts, if breakouts are leaving scars or dark marks, or if acne is affecting how you feel about yourself.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does diet cause acne?',
        answer:
          'The research is still developing. Some studies suggest that for some people, diets high in sugar and refined carbohydrates, and possibly dairy, may make acne worse. A dermatologist can help you decide whether any changes are worth trying.',
      },
      {
        question: 'Is adult acne normal?',
        answer:
          'Yes. Acne can continue past the teen years or start for the first time in adulthood, and it is especially common in women. It responds to treatment in adults as well.',
      },
      {
        question: 'Should I pop my pimples?',
        answer:
          'It is best not to. Popping can push bacteria and inflammation deeper, which makes breakouts last longer and raises the chance of dark marks and scars.',
      },
    ],
    services: ['medical-dermatology'],
    providers: ['karlee-novice', 'taylor-novice', 'erin-koppelman'],
    cta: {
      primary: 'Get help',
      accent: 'with acne.',
      description:
        'New patients welcome, and most major insurance is accepted. Call or send a request to see a dermatologist about acne.',
    },
  },
  {
    slug: 'eczema',
    kind: 'condition',
    name: 'Eczema',
    topic: 'eczema',
    label: 'Skin Guide',
    primary: 'Eczema treatment',
    accent: 'in Bloomfield Hills.',
    title: 'Eczema Treatment in Bloomfield Hills, MI',
    metaDescription:
      'What causes eczema, how it looks at different ages, and how dermatologists treat it, from Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'What drives eczema, how it shows up in babies, children, and adults, and the treatments that calm flares.',
    answer:
      'Eczema, most often a type called atopic dermatitis, is a long-term condition that makes skin dry, itchy, and inflamed, with flares that come and go. It is not contagious. At Novice Group Dermatology in Bloomfield Hills, our dermatologists treat eczema in infants, children, and adults, from gentle daily skin care to prescription treatment.',
    sections: [
      {
        heading: 'What causes eczema?',
        paragraphs: [
          'Eczema comes from a mix of genes, an immune system that overreacts, and a skin barrier that has trouble holding in moisture. It often runs in families, and many people with eczema also have asthma or hay fever.',
          'Flares are often set off by triggers such as dry winter air, harsh soaps, fragrance, wool, sweat, stress, or allergens like dust mites and pet dander. Learning your own triggers is part of keeping eczema calm.',
        ],
      },
      {
        heading: 'What does eczema look like?',
        paragraphs: [
          'The main symptom is itch, often intense enough to disturb sleep. In babies, eczema tends to appear on the cheeks and scalp. In children, it often shows up in the creases of the elbows and knees. Adults commonly have it on the hands, neck, and eyelids.',
          'On lighter skin, patches usually look red. On darker skin, they may look brown, purple, or gray. Repeated scratching can thicken the skin over time.',
        ],
      },
      {
        heading: 'How is eczema treated?',
        paragraphs: [
          'Daily care is the foundation: short, lukewarm baths or showers, a gentle fragrance-free cleanser, and a thick moisturizer applied right after bathing while the skin is still damp.',
          'When skin care alone is not enough, a dermatologist may prescribe anti-inflammatory creams or ointments, such as topical corticosteroids or non-steroid options. For moderate to severe eczema, light therapy and newer oral and injectable medicines, including biologics, are available. Eczema is long-term, so treatment focuses on calming flares, easing the itch, and keeping skin comfortable between them.',
        ],
      },
      {
        heading: 'When should you see a dermatologist for eczema?',
        paragraphs: [
          'Make an appointment if itch is keeping you or your child up at night, if over-the-counter care is not helping, if eczema covers a large area, or if the skin is cracked, oozing, crusted, or painful, which can be a sign of infection.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is eczema contagious?',
        answer: 'No. You cannot catch eczema from someone or pass it to anyone else.',
      },
      {
        question: 'Will my child outgrow eczema?',
        answer:
          'Many children find their eczema improves as they get older, though some continue to have it into adulthood. Good daily skin care helps at every age.',
      },
      {
        question: 'Are steroid creams safe to use?',
        answer:
          'Used as your dermatologist directs, topical steroids are a safe and effective way to calm eczema. The right strength depends on the area of the body and how long you use it, so follow the instructions you are given and ask if anything is unclear.',
      },
    ],
    services: ['medical-dermatology'],
    providers: ['karlee-novice', 'taylor-novice', 'erin-koppelman'],
    cta: {
      primary: 'Get help',
      accent: 'with eczema.',
      description:
        'New patients of all ages welcome, and most major insurance is accepted. Call or send a request to see a dermatologist about eczema.',
    },
  },
  {
    slug: 'psoriasis',
    kind: 'condition',
    name: 'Psoriasis',
    topic: 'psoriasis',
    label: 'Skin Guide',
    primary: 'Psoriasis treatment',
    accent: 'in Bloomfield Hills.',
    title: 'Psoriasis Treatment in Bloomfield Hills, MI',
    metaDescription:
      'What causes psoriasis, the common types, and the treatments dermatologists use, from Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'What causes psoriasis, the forms it takes, and the range of treatments from creams to biologics.',
    answer:
      'Psoriasis is a long-term immune condition that speeds up the growth of skin cells, causing raised, scaly patches that can itch or feel sore. It is not contagious. At Novice Group Dermatology in Bloomfield Hills, our dermatologists diagnose psoriasis and talk through the full range of treatment options to find a plan that fits you.',
    sections: [
      {
        heading: 'What causes psoriasis?',
        paragraphs: [
          'In psoriasis, an overactive immune system signals skin cells to grow much faster than normal, so they pile up on the surface as thick patches. Genes play a role, and it often runs in families.',
          'Flares can be triggered by stress, an injury to the skin, infections such as strep throat, certain medications, cold and dry weather, smoking, and heavy drinking.',
        ],
      },
      {
        heading: 'What are the types of psoriasis?',
        paragraphs: [
          'Plaque psoriasis is the most common. It causes raised, thickened patches with silvery-white scale, often on the elbows, knees, scalp, and lower back. On darker skin, plaques may look purple or dark brown with gray scale.',
          'Guttate psoriasis appears as small, drop-shaped spots and often follows a strep infection. Inverse psoriasis causes smooth, inflamed patches in skin folds such as the armpits and groin. Psoriasis can also affect the nails, causing pits, ridges, or separation from the nail bed.',
        ],
      },
      {
        heading: 'How is psoriasis treated?',
        paragraphs: [
          'Treatment depends on how much skin is involved, where the patches are, and your overall health. Mild psoriasis is often treated with creams and ointments, such as topical corticosteroids and vitamin D based medicines. Phototherapy, a controlled light treatment given under medical supervision, can help when larger areas are affected.',
          'For moderate to severe psoriasis, oral medicines and biologics, which target specific parts of the immune system, are options. Your dermatologist will explain the benefits and monitoring involved with each, and the plan can change as your needs do.',
        ],
      },
      {
        heading: 'When should you see a dermatologist for psoriasis?',
        paragraphs: [
          'See a dermatologist if you have scaly patches that do not clear, if psoriasis is affecting your sleep, work, or comfort, or if your current treatment has stopped working.',
          'Tell your dermatologist about any joint pain, stiffness, or swelling. Psoriasis is linked to psoriatic arthritis and to a higher risk of some other health conditions, including heart disease, so it also helps to keep your primary care doctor informed.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is psoriasis contagious?',
        answer: 'No. Psoriasis is an immune condition, and it cannot spread from person to person.',
      },
      {
        question: 'Does psoriasis go away?',
        answer:
          'Psoriasis is long-term and tends to flare and settle over time. Treatment aims to clear or reduce the patches and ease symptoms, and many people find a plan that keeps it well controlled.',
      },
      {
        question: 'Is scalp psoriasis the same as dandruff?',
        answer:
          'They can look alike. Scalp psoriasis tends to have thicker, silvery scale and can extend past the hairline onto the forehead, neck, or ears. A dermatologist can tell the two apart and treat each appropriately.',
      },
    ],
    services: ['medical-dermatology'],
    providers: ['karlee-novice', 'taylor-novice', 'erin-koppelman'],
    cta: {
      primary: 'Get help',
      accent: 'with psoriasis.',
      description:
        'New patients welcome, and most major insurance is accepted. Call or send a request to see a dermatologist about psoriasis.',
    },
  },
  {
    slug: 'rosacea',
    kind: 'condition',
    name: 'Rosacea',
    topic: 'rosacea',
    label: 'Skin Guide',
    primary: 'Rosacea treatment',
    accent: 'in Bloomfield Hills.',
    title: 'Rosacea Treatment in Bloomfield Hills, MI',
    metaDescription:
      'What causes rosacea, common triggers, and how dermatologists treat redness, bumps, and visible blood vessels, from Novice Group Dermatology in Bloomfield Hills, MI.',
    summary:
      'What sets off rosacea flares, the signs to watch for, and the treatments that calm redness and bumps.',
    answer:
      'Rosacea is a common, long-term skin condition that causes redness across the cheeks, nose, chin, or forehead, often with flushing, visible blood vessels, or acne-like bumps. It tends to flare and settle. At Novice Group Dermatology in Bloomfield Hills, our dermatologists diagnose rosacea and build a plan to calm flares and protect sensitive skin.',
    sections: [
      {
        heading: 'What causes rosacea?',
        paragraphs: [
          'The exact cause is not fully understood. Genes, the immune system, blood vessels in the face, and a reaction to tiny mites that normally live on the skin all appear to play a part. It most often begins after age 30.',
          'Many people notice that certain things set off a flare. Common triggers include sun exposure, heat, hot drinks, spicy food, alcohol, stress, strenuous exercise, wind, and some skin care products. Keeping a simple diary of flares can help you find your own.',
        ],
      },
      {
        heading: 'What are the signs of rosacea?',
        paragraphs: [
          'Signs include flushing that comes and goes, redness that lingers, small visible blood vessels called telangiectasias, and red or pus-filled bumps that can look like acne. The skin may burn or sting. Some people develop ocular rosacea, which makes the eyes dry, gritty, or irritated, and in a smaller number the skin on the nose can thicken over time.',
          'On darker skin, redness can be harder to see, and rosacea may show up instead as warmth, dryness, swelling, or a dusky change in color.',
        ],
      },
      {
        heading: 'How is rosacea treated?',
        paragraphs: [
          'Daily care makes a real difference: a gentle cleanser, a fragrance-free moisturizer, broad-spectrum sunscreen every day, and avoiding your known triggers.',
          'Prescription creams and gels, such as metronidazole, azelaic acid, and ivermectin, can reduce bumps and inflammation, and other topical medicines can temporarily reduce redness. Oral medicines, such as doxycycline, may be used for more inflamed rosacea. Laser and light treatments can reduce visible blood vessels and persistent redness.',
        ],
      },
      {
        heading: 'When should you see a dermatologist for rosacea?',
        paragraphs: [
          'See a dermatologist if facial redness does not go away, if you have bumps that do not respond to skin care, or if your eyes feel irritated. Rosacea is often mistaken for acne, and some acne products can irritate rosacea-prone skin, so a clear diagnosis helps you choose the right treatment.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is rosacea the same as acne?',
        answer:
          'They are different conditions, although the bumps of rosacea can look like acne. Rosacea usually does not cause blackheads, and it is often accompanied by flushing and lasting redness. The treatments differ too, which is why a diagnosis matters.',
      },
      {
        question: 'Can rosacea be cured?',
        answer:
          'There is no cure, but rosacea can usually be controlled. Many people keep their skin calm with a combination of gentle skin care, trigger avoidance, and prescription treatment.',
      },
      {
        question: 'Can rosacea affect my eyes?',
        answer:
          'Yes. Ocular rosacea can cause dry, gritty, burning, or red eyes and swollen eyelids. Mention any eye symptoms to your dermatologist, who may also recommend seeing an eye doctor.',
      },
    ],
    services: ['medical-dermatology'],
    providers: ['karlee-novice', 'taylor-novice'],
    cta: {
      primary: 'Get help',
      accent: 'with rosacea.',
      description:
        'New patients welcome, and most major insurance is accepted. Call or send a request to see a dermatologist about rosacea.',
    },
  },
  {
    slug: 'botox',
    kind: 'treatment',
    name: 'Botox',
    topic: 'Botox',
    label: 'Treatment Guide',
    primary: 'Botox injections',
    accent: 'in Bloomfield Hills.',
    title: 'Botox in Bloomfield Hills, MI',
    metaDescription:
      'How Botox works, what to expect at an appointment, how long results last, and how pricing works, with Dr. Fred Novice in Bloomfield Hills, MI.',
    summary:
      'How Botox softens expression lines, what an appointment is like, how long it lasts, and how it is priced.',
    answer:
      'Botox is a prescription injectable that relaxes specific facial muscles to soften expression lines, such as frown lines between the brows, forehead lines, and crow’s feet. At Novice Group Dermatology in Bloomfield Hills, Botox and Dysport are offered by Dr. Fred Novice, a board-certified dermatologist with more than 30 years of Botox and filler experience.',
    sections: [
      {
        heading: 'How does Botox work?',
        paragraphs: [
          'Botox is a purified form of botulinum toxin type A, a type of medicine called a neuromodulator. Very small amounts are injected into targeted muscles, where they block the nerve signals that make those muscles contract. As the muscle relaxes, the lines created by repeated movement, like frowning or squinting, soften.',
          'Dysport is a similar neuromodulator that works the same way. Beyond cosmetic use, neuromodulators are also used to treat excessive sweating, a condition called hyperhidrosis.',
        ],
      },
      {
        heading: 'What happens at a Botox appointment?',
        paragraphs: [
          'Your visit starts with a conversation about your goals, your medical history, and any medications you take. The injections themselves use a very fine needle, and most people describe the feeling as a quick pinch.',
          'Most people return to their usual activities the same day. Temporary redness, swelling, or small bruises at the injection sites are the most common side effects, and a mild headache can occur. Less often, a brow or eyelid can droop for a period of time. Your provider will give you aftercare instructions, such as avoiding rubbing the treated area.',
        ],
      },
      {
        heading: 'How long does Botox take to work, and how long does it last?',
        paragraphs: [
          'Most people start to notice a change within a few days, with the full effect developing over about two weeks. Results typically last a few months. Muscle movement then gradually returns, and treatment can be repeated to maintain the result.',
        ],
      },
      {
        heading: 'How is Botox priced?',
        paragraphs: [
          `Botox is priced per unit, and the number of units depends on the areas treated and the strength of your muscles. Dr. Fred will discuss the right number of units for your goals during your consultation. For current pricing, call our office at ${site.phone}.`,
        ],
      },
      {
        heading: 'Who performs Botox at Novice Group Dermatology?',
        paragraphs: [
          'Dr. Fred Novice is a board-certified dermatologist and dermatopathologist with more than 30 years of Botox and filler experience. He is among the most experienced cosmetic injectors practicing today and has trained colleagues around the world in advanced injection techniques.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Botox hurt?',
        answer:
          'Most people find it very tolerable. The needle is very fine, and each injection feels like a quick pinch that passes in seconds.',
      },
      {
        question: 'Who should not get Botox?',
        answer:
          'Botox is generally not recommended during pregnancy or breastfeeding, for people with certain nerve or muscle conditions, for anyone allergic to its ingredients, or where there is an infection at the injection site. Your provider will review your health history before treatment.',
      },
      {
        question: 'What is the difference between Botox and fillers?',
        answer:
          'Botox relaxes the muscles that cause expression lines. Dermal fillers are gels that add volume, for example to the cheeks or lips. They treat different concerns and are sometimes used together.',
      },
    ],
    services: ['cosmetic-aesthetics'],
    providers: ['fred-novice'],
    cta: {
      primary: 'Book a Botox',
      accent: 'consultation.',
      description:
        'Botox is priced per unit. Call for current pricing, or send a request to book a cosmetic consultation with Dr. Fred Novice.',
    },
  },
];

export function getGuide(kind: Guide['kind'], slug: string) {
  return guides.find((guide) => guide.kind === kind && guide.slug === slug);
}
