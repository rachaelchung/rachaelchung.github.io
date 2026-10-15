/* ==========================================================================
   playground.js — the project archive
   --------------------------------------------------------------------------
   The playground is for everything else I want to document, but isn't a featured project. Each entry answers who / what / when / why / how and that
   is the entire write-up.

   Used by:
     index.html      -> the two scrolling marquee rows (images + name + what)
     playground.html -> the filterable archive grid + detail modal
   ========================================================================== */

/* --------------------------------------------------------------------------
   The tag vocabulary for PLAYGROUND items.
   Deliberately different from PROJECT_TAGS in projects.js
   -------------------------------------------------------------------------- */
const PLAYGROUND_TAGS = [
  'experiment',
  'filmography',
  'photography',
  'campaign',
  'programming',
  'graphic design',
  'fabrication',
  'game',
  'web',
  'cad',
  'storytelling',
  'ai-assisted',
  'assembly',
  'electronics',
  'hardware',
  'hackathon',
  'social media',
  'prototyping',
  'mobile',
];

/* --------------------------------------------------------------------------
   Playground entries.

   Field reference
   ---------------
   slug     unique id
   name     card title (lowercase reads best)
   when     free text: "feb 2026", "one rainy tuesday", "summer 2025"
   short    the hover reveal on the marquee + the back of the archive card.
            Keep it under ~120 characters or it clips.
   image    card image
   alt      alt text — always fill this in
   tags     any number, drawn from PLAYGROUND_TAGS
   who      who it was for / who was involved
   what     what the thing actually is
   why      why it exists. This is usually the funniest field. Use it.
   how      what it was made with / how it came together
   gallery  optional array of image urls for the modal. Omit or leave empty
            and the modal shows a friendly placeholder instead.
   link     optional { label, url } for a live demo, repo, video, etc.
   -------------------------------------------------------------------------- */
const playgroundItems = [
  {
    slug: 'cadenzas',
    name: 'cadenzas',
    when: 'spring 2026',
    short: "Collect little lines of songs like they are part of your life's poetry.",
    image: 'images/cadenzasTitle.jpg',
    alt: 'cadenzas',
    tags: ['web', 'experiment', 'ai-assisted'],
    who: 'solo, for 15-113',
    what: 'A song lyric collection web app utilizing LRCLIB API for users to collect and share their favorite lyrics.',
    why: 'I have a running list of song lyrics that I collect, so why not make a quick app to explore APIs?',
    how: 'Using JavaScript, HTML & CSS, the crowd-sourced LRCLIB API, and local storage for the gallery.',
    gallery: [
      'images/cadenzas/1.jpg',
      'images/cadenzas/2.jpg',
      'images/cadenzas/3.jpg',
    ],
    link: { label: 'see it live', url: 'https://rachaelchung.github.io/API-demo/index.html' }
  },
  {
    slug: 'minesweeperButBetter',
    name: 'Minesweeper But Better',
    when: 'fall 2025',
    short: 'I like minesweeper. A lot. So I just made it a little better.',
    image: 'images/minesweeperTitle.png',
    alt: 'Minesweeper But Better',
    tags: ['programming', 'graphic design', 'game'],
    who: 'solo, for 15-112',
    what: 'A final project created in my programming fundamentals class that explores minesweeper with three gamemodes: regular, competitive, and musical. Complete with clean UI, custom themes, and a store. (everything built from scratch and from a unfortunate intricate understanding of the game from just playing it a lot)',
    why: 'Minesweeper is a classic game that I enjoy quite a lot, but found aesthetically uninteresting and repetitive, thus leading to many themes and gamemodes.',
    how: 'Using Python, CMU CS 112 Graphics, and built within CS Academy**(due to constant changes in CS Academy, the project may not work as expected, visit the code for the latest updates)',
    embed: { src: 'https://academy.cs.cmu.edu/sharing/silverChimpanzee423312', height: '620px', title: 'Minesweeper But Better' },
    link: { label: 'play it', url: 'https://github.com/rachaelChung/minesweeperButBetter/tree/main' },
  },
  {
    slug: 'flashlight',
    name: 'Hand-Powered Flashlight',
    when: 'fall 2025',
    short: 'A short fabrication project for the dark.',
    image: 'images/flashlight/1.jpeg',
    alt: 'Hand-Powered Flashlight',
    tags: ['fabrication', 'cad', 'assembly'],
    who: 'solo, for 24-101',
    what: 'A hand-powered flashlight using gear systems to convert rotational energy into electrical energy to power an LED light.',
    why: 'A project to get hands-on experience with mechanical design and assembly, specifically calculating gear ratios and designing a gear to reach a target output speed within given constraints.',
    how: 'Modified CAD assembly in SolidWorks, laser cutting and 3D printing for manufacturing, and gear ratio calculations.',
    gallery: ['images/flashlight/1.jpeg', 'images/flashlight/2.jpg'],
  },
  {
    slug: 'countingLinesMobot',
    name: 'Counting Lines Mobot',
    when: 'fall 2025',
    short: 'A short arduino project for counting lines and measuring distances.',
    image: 'images/countingLinesMobot/1.jpeg',
    alt: 'Counting Lines Mobot',
    tags: ['electronics', 'programming', 'hardware'],
    who: 'solo, for 24101',
    what: 'A programmed Arduino to count lines crossed by a Mobot robot using an IR sensor and stop after a certain distance',
    why: 'A project to practice physically assembling an Arduino circuit and programming basic functions',
    how: 'Using Arduino IDE and a breadboard to create the circuit and program the Arduino for the Mobot (*due to this project being repeated, I cannot share the code publicly, but feel free to ask!)',
    gallery: ['images/countingLinesMobot/1.jpeg'],
  },
  // {
  //   slug: 'wishWeekBranding',
  //   name: 'Wish Week 2025 Brand Identity',
  //   when: 'spring 2025',
  //   short: 'The visual identity for Chap Wish Week 2025, #CreateJoyForCarter',
  //   image: 'images/wishWeekTitle.png',
  //   alt: 'Wish Week 2025 Brand Identity',
  //   tags: ['campaign', 'storytelling', 'graphic design'],
  //   who: 'solo, as Project Coordinator for Wish Week 2025 at Chaparral High School',
  //   what: "Branding and promotional materials for Chaparral High School's Wish Week, including logos, color themes, stickers, shirts, bracelets, and hoodies, of which sold out in 1 day, and helped raise over $120,000 for Make-A-Wish Colorado in one week.",
  //   why: 'To create a cohesive visual identity for a fundraising event, using design skills for a greater goal of granting our wish kid Carter\'s wish and raising money for Make-A-Wish Colorado.',
  //   how: 'Designed using social media graphics with Canva and logos with Linearity Curve and help from Lance Kirkpatrick',
  //   gallery: ['images/wishWeek/1.jpg', 'images/wishWeek/2.jpg'],
  // },
  {
    slug: 'fenceDefense',
    name: 'Fence Defense',
    when: 'fall 2025',
    short: 'Defend the fence from incoming enemies!',
    image: 'images/fenceDefenseTitle.jpg',
    alt: 'Fence Defense',
    tags: ['hackathon', 'programming', 'game'],
    who: 'A team of four, for Hackathon: Hack112',
    what: 'A tower defense game where players place various turrets and their phone flashlight to stop incoming enemies from attacking the fence. Built in 24 hours.',
    why: 'The Fence is an important landmark at CMU, and this game showcases not only the importance of our tradition, but showcases our best skills from 15-112',
    how: 'Using Python, CMU CS 112 Graphics, Open CV, and Canva to program game mechanics, graphics, and user interface',
    gallery: ['images/fenceDefense/1.jpg', 'images/fenceDefense/2.jpg'],
    link: { label: 'see on GitHub', url: 'https://github.com/F25-Hack112/hack112-group-16' },
  },
  {
    slug: 'hadestown',
    name: 'Hadestown Promo Video',
    when: 'spring 2025',
    short: 'Hadestown: Teen Edition at Chaparral High School',
    image: 'images/hadestownTitle.jpg',
    alt: 'Placeholder image for little thing seven',
    tags: ['filmography', 'storytelling', 'social media'],
    who: 'solo, as videographer and editor',
    what: 'A promotional video capturing the the actors, sets, pit orchestra, props, and costumes of my high school\'s production of Hadestown: Teen Edition.',
    why: 'To visually showcase and promote the talents of our theater department and encourage attendance for opening weekend.',
    how: 'Using CapCut to edit, footage filmed with a Canon EOS Rebel T5i, and audio from the Broadway promo of Hadestown.',
    embed: { src: 'https://www.youtube.com/embed/SLya6HPZyLw?si=e-ZCYc0gJ0YCsl0H', title: 'Hadestown Promo Video' },
    link: { label: 'watch on Instagram', url: 'https://www.instagram.com/reel/DGJdhDJSkXG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' } 
  },
  {
    slug: 'classShirts',
    name: 'Class Shirt Designs',
    when: 'summer 2023 & 2024',
    short: 'Class shirt designs for the Class of 2025',
    image: 'images/classShirtsTitle.jpg',
    alt: 'Class Shirts',
    tags: ['graphic design'],
    who: 'solo, in collaboration with class representatives',
    what: 'A series of class shirt designs created for the Class of 2025, incorporating school spirit and class identity.',
    why: 'To create memorable and appealing designs that represent the Class of 2025 and foster a sense of community.',
    how: 'Using design software such as Linearity Curve and Canva to create various shirt concepts and finalize designs.',
    gallery: ['images/classShirts/1.jpg', 'images/classShirts/2.jpg'],
  },
  {
    slug: 'movieThisorThat',
    name: 'Movie This or That',
    when: 'spring 2026',
    short: 'Decide the movie to watch just from the taglines.',
    image: 'images/movieThisorThatTitle.jpg',
    alt: 'Movie This or That',
    tags: ['web', 'ai-assisted'],
    who: 'solo, for 15113',
    what: 'A movie recommendation game where users select a genre and streaming providers to receive movie recommendations by playing this or that with movie taglines.',
    why: 'To create a fun and interactive movie recommendation app while exploring backend development and API integration.',
    how: 'Using JavaScript, HTML & CSS for the frontend, and Python with Flask for the backend, integrating with the TMDB API for movie data. Hosted on a free tier of Render.',
    gallery: ['images/movieThisorThat/1.jpg', 'images/movieThisorThat/2.jpg', 'images/movieThisorThat/3.jpg'],
    link: { label: 'see on GitHub', url: 'https://github.com/rachaelchung/backend_explore' }
  },
  {
    slug: 'dispatch',
    name: 'Dispatch.',
    when: 'spring 2026',
    short: 'Just text yourself, then never lose track.',
    image: 'images/dispatchTitle.jpg',
    alt: 'Placeholder image for little thing ten',
    tags: ['web', 'ai-assisted', 'prototyping'],
    who: 'solo, for 15113',
    what: 'A task management and productivity app that utilizes AI to help users capture, organize, and manage their tasks through natural language input. Created in approximately 6 hours.',
    why: 'I found out there were some people that just text or email themselves tasks and updates to capture them. I wanted to create something that would allow people to continue using this workflow that works for them, but organize it more effeiciently in front of them.',
    how: 'Using JavaScript, HTML & CSS for the frontend, Python with Flask for the backend, and integrating with OpenAI’s GPT-4 API for natural language processing. Hosted on Render.',
    embed: { src: 'https://www.youtube.com/embed/HIlsmD10nZo?si=Jc6lvAr1aek6JR7O', title: 'Dispatch Demo Video' },
    link: { label: 'see on GitHub', url: 'https://github.com/rachaelchung/dispatch' }
  },
  {
    slug: 'flow',
    name: 'flow / expense tracker',
    when: 'spring 2026',
    short: 'Track the flow of money, done simply.',
    image: 'images/flowTitle.jpg',
    alt: 'flow / expense tracker',
    tags: ['web', 'ai-assisted', 'experiment'],
    who: 'solo, for 15113',
    what: 'A simple expense tracking app exploring SQLite databases.',
    why: 'To create a simple yet effective tool for make tracking where your money is going easier.',
    how: 'Using JavaScript, HTML & CSS for the frontend, Python with Flask for the backend, and SQLite for the database.',
    gallery: ['images/1.jpg', 'images/2.jpg'],
    link: { label: 'see on GitHub', url: 'https://github.com/rachaelchung/database-explore' }
  },
  {
    slug: 'rememberTheTime',
    name: 'Remember the Time...',
    when: 'spring 2026',
    short: 'Every moment is precious. Just take a pic now and remember it later.',
    image: 'images/rememberTheTimeTitle.jpg',
    alt: 'Remember The Time...',
    tags: ['mobile', 'ai-assisted', 'experiment'],
    who: 'solo, for 15113',
    what: 'A memory storing app that lets users take photos, write captions, and store them in a gallery to reminisce on later.',
    why: 'Sometimes memories can get lost or forgotten, so I wanted to create a simple and accessible way for people to capture and store their memories in a digital format that they can look back on and reminisce about.',
    how: 'Using React Native for mobile app development, Expo for building and testing the app, and local storage to save photos and captions on the user\'s device.',
    gallery: ['images/rememberTheTime/1.jpg', 'images/rememberTheTime/2.jpg'],
    link: { label: 'see on GitHub', url: 'https://github.com/rachaelchung/mobile-app-hw' }
  },
  {
    slug: 'frolicInTheGrass',
    name: 'Frolic in the Grass Concert',
    when: 'spring 2026',
    short: 'The visual identity for my A Cappella group\'s spring concert.',
    image: 'images/frolicInTheGrassTitle.jpg',
    alt: 'Frolic in the Grass Concert',
    tags: ['campaign', 'graphic design', 'photography'],
    who: 'solo, for 15113',
    what: 'A concert poster, concert program, YouTube Live screens, photography, and promotional materials for my A Cappella group\'s spring concert, Frolic in the Grass.',
    why: 'To create a visually appealing and cohesive design that captures the theme of our concert, based on Malachi 4:2',
    how: 'Using design software such as Canva to create posters and graphics, and concert photography with a Canon EOS Rebel T7i.',
    gallery: ['images/frolicInTheGrass/1.png', 'images/frolicInTheGrass/2.png', 'images/frolicInTheGrass/3.png'],
    link: { label: 'see on Instagram', url: 'https://www.instagram.com/p/DXC2abikaO3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
  },
];
