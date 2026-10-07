// All copy lives here. Edit this file, then run `npm run build`.
//
// `draft: true` means the case-study body copy was written from the project
// card titles, not from María's own account. It must be verified before
// publishing. Draft case-study pages are emitted with `noindex`.

export const site = {
  name: 'María Berrocal',
  role: 'Senior Product Designer',
  email: 'mariabeatrizber@gmail.com',
  linkedin: 'https://www.linkedin.com/notifications/', // NOTE: this is LinkedIn's notifications page, not a profile URL. Replace with https://www.linkedin.com/in/<handle>
  year: new Date().getFullYear(),
};

export const hero = {
  greeting: 'Hi, I’m',
  name: 'María Berrocal',
  title: 'a Product Designer.',
  lede: '8 years of experience designing digital products where understanding the system, questioning assumptions, and figuring out the real problem is half the work.',
  cta: 'View my work',
  loop: {
    say: ['Frame it.', 'Craft it.', 'Ship it.', 'On repeat.'],
    lede: 'A loop that never stops.',
    bridge: 'Take a look at how I apply the loop: from the messy first question to what was shipped.',
    title: 'Translated into something tangible',
  },
  strengths: [
    ['Product thinking', 'Framing the right problem before drawing the first screen.'],
    ['Visual Design', 'Interfaces held to a level of detail you can feel.'],
    ['High-pressure, fast-paced', 'Shipping inside fast-moving teams, next to Product and Engineering.'],
  ],
};

export const journey = {
  title: 'My design journey so far.',
  lede: '8 years across consulting, UX/UI, and product design. I like getting to the root of complex problems, asking the right questions, and turning them into products people can actually use.',
  steps: [
    {
      n: '01',
      org: 'Waterplan',
      logo: 'waterplan',
      role: 'Senior Product Designer',
      dates: '2022 – Present',
      current: true,
      focus: 'Product design across Waterplan & Civarea',
      body: 'Leading end-to-end product design across Waterplan and Civarea, from early customer problems to shipped products, working closely with Product and Engineering.',
    },
    {
      n: '02',
      org: 'EY Design Studio',
      logo: 'ey-design-studio',
      role: 'UX/UI Senior Designer',
      dates: '2021 – 2022',
      focus: 'Digital products & experiences for financial clients',
      body: 'Designed and shipped digital products across industries, translating research and business needs into end-to-end experiences.',
    },
    {
      n: '03',
      org: 'EY Consulting',
      logo: 'ey',
      unit: 'Financial Services',
      role: 'Senior Consultant',
      dates: '2018 – 2021',
      focus: 'Strategy, business & digital transformation',
      body: 'Worked on multidisciplinary consulting projects, turning complex business problems into strategies and digital solutions.',
    },
  ],
};

export const toolkit = {
  title: 'What I use in my workflows.',
  groups: [
    ['Design and prototypes', [['Claude', 'claude'], ['Figma', 'figma'], ['ChatGPT', 'chatgpt'], ['Builder.io', 'builder']]],
    ['Handoff and delivery', [['GitHub', 'github'], ['Vercel', 'vercel'], ['Supabase', 'supabase']]],
    ['Product marketing', [['Framer', 'framer'], ['Arcade', 'arcade'], ['Veed.io', 'veed'], ['Canva', 'canva']]],
  ],
};

export const about = {
  title: 'About me',
  quote:
    'I’ve learned that the first problem you hear is rarely the whole problem. I actually like the messy part — when things don’t completely make sense yet. Asking questions, connecting the dots, trying things out, and moving fast until it all starts to come together.',
  by: 'María Berrocal',
  // Draft principles, written from the quote and the case studies. Edit freely.
  beliefs: [
    ['Ask first', 'The first problem you hear is rarely the whole one.'],
    ['Connect the dots', 'Systems, people and constraints, before screens.'],
    ['Try it, move fast', 'Prototype early, learn out loud, ship in steps.'],
  ],
};

export const contact = {
  title: 'Let’s work together.',
  lede: 'Product design, UX/UI and consulting. Always happy to talk, even early.',
};

// Case studies -------------------------------------------------------------

export const projects = [
  {
    slug: 'target-tracking',
    clients: [
      'The world’s largest independent beverage bottler and a global FMCG leader.',
      'The world’s largest brewer and a leading global beverage corporation.',
      'A Fortune 500 consumer goods leader with omnipresent global brands.',
    ],
    blurb: 'Companies promise to use less water, but only checked in once a year. I designed a view that shows whether a target is on track, and what to do if it is not.',
    visual: 'targetTracking',
    tone: 'dark',
    card: 'a',
    draft: true,
    title: 'From tracking sustainability targets to making better decisions',
    short: 'Waterplan Target Tracking',
    tags: ['Product Design', 'B2B SaaS', 'AI-driven'],
    company: 'Waterplan',
    companyLogo: 'waterplan',
    role: 'Senior Product Designer',
    scope: 'Target tracking, scenarios, AI-suggested projects',
    team: 'Product, Engineering, Data',
    lede: 'Large companies promise to use less water. The hard part is knowing, year by year, whether they will keep that promise, and what to do if they will not.',
    context: [
      'Waterplan is a platform that helps big companies understand and manage their water use. Its customers, such as beverage makers and brewers, commit to water targets, for example to use less water to make every litre of product by 2030.',
      'Each target has a baseline (the starting point), the last reported results from the company’s plants, and the target itself (the goal).',
    ],
    problem: [
      'A target is a promise made years in advance. Teams checked it once a year, in spreadsheets, after the data was already old. By the time they saw a gap, it was too late to close it.',
      'The product could show a target and its latest number. It could not answer the two questions that matter: will we make it? And if not, what should we do?',
    ],
    hard: [
      'Every target is measured differently: a different metric, a different starting year, a different set of plants.',
      'The data arrives late and is often incomplete, because each plant reports on its own schedule.',
      'The same screen also had to work for two kinds of people: analysts who want every detail, and executives who want a simple answer.',
      'A single progress bar would have been easy to build and easy to read. It would also have been misleading.',
    ],
    role_body: [
      'I led the design from the first question to the shipped screens, working every day with Product, Engineering and Data. My job was to decide what the product should tell people, and in what order.',
    ],
    decisions: [
      {
        title: 'Show where you are headed, not only how far you have come',
        chose: 'A line over time',
        over: 'A percentage',
        why: 'Being 60% of the way there sounds good, unless 90% of the time has gone. A line that shows the path to the target, next to the real results, makes that gap obvious at a glance.',
      },
      {
        title: 'One clear status: on track or off track',
        chose: 'One status everyone shares',
        over: 'Each team defining its own',
        why: 'A status is only useful if people trust it. One definition for everyone, with the reason a target is off track in plain sight, let teams stop arguing about the numbers and start talking about what to do.',
      },
      {
        title: 'Turn “what if?” into a scenario',
        chose: 'Scenarios that combine projects and investment',
        over: 'A list of generic recommendations',
        why: 'When a target is off track, the next question is “what would it take?”. A scenario combines projects, like recycling wastewater, with an investment, and shows the cost and whether the target is reached. The AI suggests combinations; people make the choice.',
      },
    ],
    stages: [
      ['A table of numbers', 'The first version listed each target with its starting value and its latest result. It was accurate, but it did not say whether the target was in danger.'],
      ['A line towards the goal', 'Drawing each target as a line over time, with the real results on it, made the gap visible for the first time.'],
      ['From a gap to a plan', 'The screen now says whether a target is on or off track, and by how much, and lets teams build scenarios to close the gap, with suggested combinations of projects and investment.'],
    ],
    shipped: [
      'A target page showing results over time against the goal',
      'A clear on track or off track status, with how far off',
      'Scenarios: combinations of projects and investment, with their cost and effect',
      'AI-suggested combinations that would reach the target',
    ],
    outcome: [
      'Teams no longer had to rebuild progress by hand in spreadsheets before every review.',
      'The conversation moved from “where are we?” to “what should we do about it?”',
    ],
  },
  {
    slug: 'site-selection',
    blurb: 'Hundreds of signals, dozens of candidate sites. I designed a ranked shortlist with adjustable weights, so every choice comes with its reasoning.',
    visual: 'siteSelection',
    tone: 'light',
    card: 'b',
    draft: true,
    title: 'Turning hundreds of location signals into clear infrastructure decisions',
    short: 'Civarea Site Selection',
    tags: ['Product Design', 'Data Visualization', 'AI-driven'],
    company: 'Civarea',
    companyLogo: null,
    role: 'Senior Product Designer',
    scope: 'Site comparison, scoring model, map and shortlist',
    team: 'Product, Engineering, Data',
    lede: 'Choosing where to build means weighing hundreds of signals across dozens of sites. The job was to make that judgment something a team could defend.',
    problem: [
      'Deciding where to place infrastructure meant weighing land, access, water, regulation and more, across many candidate sites. Teams worked from exports and slide decks, and the reasoning behind a choice was hard to retrace.',
    ],
    hard: [
      'The signals differ in quality, scale and relevance. The weights are partly subjective. And people had to trust a ranking before committing real capital to it.',
      'A map full of data points would have looked impressive and decided nothing.',
    ],
    role_body: [
      'I owned the experience end to end: how a team frames a search, how signals become criteria, and how a shortlist earns trust.',
    ],
    decisions: [
      {
        title: 'A ranked shortlist with visible reasoning',
        chose: 'Ranking that shows why',
        over: 'A single opaque score',
        why: 'A number nobody can interrogate does not survive the first meeting. Showing the criteria behind each rank gave people something to argue with.',
      },
      {
        title: 'The map is context, not the interface',
        chose: 'List and map, linked',
        over: 'A map-first screen',
        why: 'Comparison happens in a list. The map answers “where?” and then gets out of the way.',
      },
      {
        title: 'Weights you can move',
        chose: 'Adjustable weights with immediate effect',
        over: 'A fixed scoring model',
        why: 'Teams disagree about what matters. Letting them move a weight and watch the ranking respond turned the disagreement into a conversation.',
      },
    ],
    stages: [
      ['Every signal, everywhere', 'The starting point was the raw material: hundreds of signals scattered across a region. Complete, and unreadable.'],
      ['Signals grouped into criteria', 'Rolling signals up into a handful of criteria turned noise into terrain: where conditions were strong, and where they were not.'],
      ['A shortlist you can defend', 'The terrain became a ranked shortlist with adjustable weights, so the choice came with its reasoning attached.'],
    ],
    shipped: [
      'Linked map and ranked shortlist',
      'Criteria breakdown for every site',
      'Adjustable weights with live re-ranking',
    ],
    outcome: [
      'Site decisions came with a trail of reasoning instead of a deck.',
      'Disagreements moved from opinions about the score to the weights behind it.',
    ],
  },
  {
    slug: 'digital-banking',
    blurb: 'An app that had grown one feature at a time. I rebuilt it around the few tasks people open it to do, with a component system to hold it together.',
    visual: 'banking',
    tone: 'dark',
    card: 'c',
    draft: true,
    title: 'Redesigning a digital banking experience from the ground up',
    short: 'EY Digital Banking',
    tags: ['UX/UI Design', 'Fintech'],
    company: 'EY Design Studio',
    companyLogo: 'ey-design-studio',
    role: 'UX/UI Senior Designer',
    scope: 'Research synthesis, flows, UI, design system, handoff',
    team: 'Design, Engineering, Client stakeholders',
    lede: 'A banking app that had grown one feature at a time, rebuilt around the few things people open it to do.',
    problem: [
      'The bank’s app had grown feature by feature. Each team added its own entry point, and the first screen turned into a catalogue. Customers hunted for routine tasks: checking a balance, paying someone, moving money.',
    ],
    hard: [
      'A regulated product, legacy systems underneath, and features owned by different teams who each wanted the first screen. Every decision was also a negotiation.',
    ],
    role_body: [
      'I translated research and business needs into end-to-end flows and interfaces, built the components to hold them together, and handed them off to Engineering.',
    ],
    decisions: [
      {
        title: 'Organise by what people do',
        chose: 'A task-first home',
        over: 'A product-first home',
        why: 'Customers think “pay a bill,” not “open the payments module.” Structuring around tasks matched how people actually arrive.',
      },
      {
        title: 'Fewer, clearer actions',
        chose: 'A short list of primary actions',
        over: 'Feature parity on day one',
        why: 'Everything on the first screen meant nothing was findable. We chose a few actions to do well and gave the rest a clear place.',
      },
      {
        title: 'Components built for the bank’s constraints',
        chose: 'A reusable system',
        over: 'One-off screens',
        why: 'With many teams shipping, consistency had to be built in. A shared set of components made the good decision the easy one.',
      },
    ],
    stages: [
      ['Everything on the first screen', 'The existing home gave every product and offer a tile. Complete, and a lot to read before doing anything.'],
      ['Grouped by what people do', 'Regrouping around tasks removed most of the searching, even before the visual design changed.'],
      ['A home built around a few jobs', 'The new home leads with balance, three primary actions and recent activity. The rest sits one clear step away.'],
    ],
    shipped: [
      'Task-first home with primary actions',
      'Redesigned transfer and payment flows',
      'Component library handed off for build',
    ],
    outcome: [
      'Routine tasks took fewer steps to reach.',
      'Teams had one set of components to build with instead of many.',
    ],
  },
  {
    slug: 'platform-navigation',
    clients: [
      'The world’s largest independent beverage bottler and a global FMCG leader.',
      'The world’s largest brewer and a leading global beverage corporation.',
      'A Fortune 500 consumer goods leader with omnipresent global brands.',
    ],
    blurb: 'A platform organised around how it was built. I redesigned the navigation around what people are trying to do, and rolled it out in steps.',
    visual: 'navigation',
    tone: 'light',
    card: 'd',
    draft: true,
    title: 'Making a growing platform easier to navigate',
    short: 'Waterplan Platform Navigation',
    tags: ['Product Design', 'UX-UI Design'],
    company: 'Waterplan',
    companyLogo: 'waterplan',
    role: 'Senior Product Designer',
    scope: 'Information architecture, navigation model, rollout',
    team: 'Product, Engineering',
    lede: 'A platform that grew module by module needed a structure organised around what people are trying to do, not how it was built.',
    problem: [
      'As the platform grew, navigation grew with it: one entry per module, added as each shipped. The structure mirrored how the product was built, not how people work.',
    ],
    hard: [
      'Existing users had muscle memory. Roles used different parts of the product. Modules were at different levels of maturity. Any change had to help new users without losing the old ones.',
    ],
    role_body: [
      'I led the information architecture and the navigation model, and shaped the rollout with Product and Engineering so the change could land in steps.',
    ],
    decisions: [
      {
        title: 'Organise around questions, not modules',
        chose: 'Groups based on what people are doing',
        over: 'One entry per module',
        why: 'People arrive with a question, such as “where are we at risk?” or “what is our plan?”. The structure should meet them there.',
      },
      {
        title: 'Shallow and persistent',
        chose: 'A persistent primary nav with contextual secondary',
        over: 'A deep tree',
        why: 'People always know where they are, and the deeper options only appear when they matter.',
      },
      {
        title: 'Ship in steps',
        chose: 'An incremental rollout',
        over: 'A single big switch',
        why: 'Familiar paths stayed where people expected them while the new structure took hold.',
      },
    ],
    stages: [
      ['A sprawl of entry points', 'Mapping the existing product showed how many places a single task could start, and how few of them connected.'],
      ['Grouped by intent', 'Collapsing the sprawl into a handful of groups, each named for a question people ask, gave the structure its first clear shape.'],
      ['One persistent navigation', 'The final model keeps primary navigation stable and reveals secondary options in context.'],
    ],
    shipped: [
      'New information architecture',
      'Persistent primary navigation with contextual secondary',
      'Workspace and facility switcher',
    ],
    outcome: [
      'New users found their way without a guide.',
      'The structure had room for new modules without a redesign.',
    ],
  },
];
