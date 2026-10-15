/* ==========================================================================
   projects.js — featured projects
   --------------------------------------------------------------------------
   These are the "big" projects: each one has its own markdown write-up in
   /content/projects and its own page under /projects.

   This file is the single source of truth for the flip cards on index.html.
   Keep the fields here in sync with the YAML frontmatter in the matching .md
   file (see projectTemplate.md). When you eventually move to Astro content
   collections, this array gets replaced by getCollection('projects') and the
   field names carry over unchanged.

   TODO: replace every placeholder below with your real projects.
   ========================================================================== */

/* --------------------------------------------------------------------------
   The tag vocabulary for FEATURED projects.
   Pick at most 5 per card — more than that and the card gets noisy.
   Add or remove freely; the cards just read whatever strings you list.
   -------------------------------------------------------------------------- */
const PROJECT_TAGS = [
  'mechanical design',
  'cad',
  'fea',
  'rapid prototyping',
  'fabrication',
  '3d printing',
  'laser cutting',
  'machining',
  'electronics',
  'arduino',
  'ux design',
  'user research',
  'physical computing',
  'storytelling',
  'interaction design',
  'graphic design',
  'social media',
  'videography',
  'python',
  'web dev',
  'ai-assisted dev',
  'creative direction',
  'gamification',
  'chrome extension'
];

/* --------------------------------------------------------------------------
   Featured projects.

   Field reference
   ---------------
   slug      unique id, also the filename: /projects/<slug>.html
   title     shown on both faces of the card (lowercase looks best)
   year      small text under the title, e.g. "fall 2026"
   suit      the little playing-card glyph in the top-right corner
   image     front-of-card image. Landscape-ish crops work best.
   alt       alt text for the image — always fill this in
   blurb     the back of the card. Aim for 240-320 characters; longer than
             that and it clips on small cards.
   tags      max 5, drawn from PROJECT_TAGS above
   role      shown on the back of the card, e.g. "team of 4"
   url       where "see more" goes
   -------------------------------------------------------------------------- */
const projects = [
  {
    slug: 'vivifi',
    title: 'Vivifi',
    year: 'summer 2026',
    suit: '♠',
    image: 'images/vivifiTitle.png',
    alt: 'Placeholder image for Vivifi',
    blurb:
      'Live gradebook and interactive syllabus for students. It allows students to upload their syllabus and then track everything the syllabus expected them to know at once.',
    tags: ['ux design', 'interaction design', 'web dev', 'ai-assisted dev'],
    role: "solo, for Stellic Pathfinders Challenge 2026",
    url: 'projects/vivifi.html',
  },
  {
    slug: 'pillDispenser',
    title: 'Pill Dispenser Mechanism',
    year: 'fall 2025',
    suit: '♥',
    image: 'images/pillDispenserTitle.png',
    alt: 'Placeholder image for Pill Dispenser',
    blurb:
      'A pill dispenser built to deliver marbles (as pills) at a set interval of one pill per minute. High emphasis on precision and reliability.',
    tags: ['mechanical design', 'cad', 'fabrication', 'rapid prototyping'],
    role: 'team of 4',
    url: 'projects/pillDispenser.html',
  },
  {
    slug: 'wishWeekBranding',
    title: 'Wish Week 2025 Brand Identity',
    year: 'spring 2025',
    suit: '♦',
    image: 'images/wishWeekBrandingTitle.png',
    alt: 'Placeholder image for Wish Week 2025 Brand Identity',
    blurb:
      'The brand for my high school\'s Wish Week: a smile. Along with a hoodie, stickers, and a campaign to celebrate one kid.',
    tags: ['graphic design', 'storytelling', 'social media', 'user research'],
    role: 'solo, in collaboration',
    url: 'projects/wishWeekBranding.html',
  },
  {
    slug: 'wishWeekReveal',
    title: 'Wish Week 2025 Reveal Video',
    year: 'spring 2025',
    suit: '♣',
    image: 'images/wishWeekRevealTitle.png',
    alt: 'Placeholder image for Wish Week 2025 Reveal Video',
    blurb:
      'The reveal video for my high school\'s Wish Week, played in the gym for students who didn\'t yet know who the wish kid was or what the theme would be. I directed, produced, and edited it, and ran the team that made it.',
    tags: ['storytelling', 'videography', 'creative direction'],
    role: 'director, with team of 6',
    url: 'projects/wishWeekReveal.html',
  },
  {
    slug: 'headEmpty',
    title: 'head empty. no thoughts',
    year: 'spring 2026',
    suit: '♠',
    image: 'images/headEmptyTitle.png',
    alt: 'Placeholder image for head empty. no thoughts',
    blurb:
      'A gamified assignment tracker for students who don\'t really want to do them. Focus with a pomodoro timer, and if you stay locked in long enough, little creatures wander across your screen for you to catch.',
    tags: ['gamification', 'interaction design', 'web dev', 'chrome extension', 'ai-assisted dev'],
    role: 'solo',
    url: 'projects/headEmpty.html',
  },
  {
    slug: 'socialMedia',
    title: 'Selected Social Media Content',
    year: 'since fall 2024',
    suit: '♥',
    image: 'images/socialMediaTitle.png',
    alt: 'Placeholder image for Selected Social Media Content',
    blurb:
      'Social media accounts I\'ve run, content I\'ve made, and campaigns I\'m proud of.',
    tags: ['social media', 'graphic design', 'storytelling', 'creative direction'],
    role: 'solo',
    url: 'projects/socialMedia.html',
  },
];
