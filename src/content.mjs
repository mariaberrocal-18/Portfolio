// All copy lives here. Edit this file, then run `npm run build`.
//
// `draft: true` means the case-study body copy was written from the project
// card titles, not from María's own account. It must be verified before
// publishing. Draft case-study pages are emitted with `noindex`.

export const site = {
  name: 'María Berrocal',
  role: 'Senior Product Designer',
  email: 'hello@mariaberrocal.com', // TODO: replace with the real address
  linkedin: 'https://www.linkedin.com/in/', // TODO: add profile URL
  year: new Date().getFullYear(),
};

export const hero = {
  greeting: 'Hi, I’m',
  name: 'María Berrocal',
  title: 'a Product Designer.',
  lede: '8 years of experience designing digital products where understanding the system, questioning assumptions, and figuring out the real problem is half the work.',
  cta: 'View selected work',
  strengths: [
    ['Product thinking', 'Framing the right problem before drawing the first screen.'],
    ['Visual craft', 'Interfaces held to a level of detail you can feel.'],
    ['Pace', 'Shipping inside fast-moving teams, next to Product and Engineering.'],
  ],
};

export const journey = {
  title: 'My design journey so far.',
  lede: '8 years across consulting, UX/UI, and product design. I like getting to the root of complex problems, asking the right questions, and turning them into products people can actually use.',
  steps: [
    {
      n: '01',
      org: 'EY Consulting',
      unit: 'Financial Services',
      role: 'Senior Consultant',
      dates: '2018 – 2021',
      focus: 'Strategy, business & digital transformation',
      body: 'Worked on multidisciplinary consulting projects, turning complex business problems into strategies and digital solutions.',
    },
    {
      n: '02',
      org: 'EY Design Studio',
      role: 'UX/UI Senior Designer',
      dates: '2021 – 2022',
      focus: 'Digital products & experiences for financial clients',
      body: 'Designed and shipped digital products across industries, translating research and business needs into end-to-end experiences.',
    },
    {
      n: '03',
      org: 'Waterplan',
      role: 'Senior Product Designer',
      dates: '2022 – Present',
      current: true,
      focus: 'Product design across Waterplan & Civarea',
      body: 'Leading end-to-end product design across Waterplan and Civarea, from early customer problems to shipped products, working closely with Product and Engineering.',
    },
  ],
};

export const toolkit = {
  title: 'What I use in my workflow.',
  groups: [
    ['Design', ['Figma']],
    ['Prototype and publish', ['Framer', 'GitHub']],
    ['Think and explore with AI', ['Claude', 'ChatGPT']],
  ],
};

export const about = {
  statement: 'Half the work is figuring out the real problem.',
  body: [
    'I came into product design through consulting, which is where I learned to read a system before touching it: who decides, what they trust, and what quietly slows them down.',
    'Today I design B2B products for people who make high-stakes decisions with messy data. I like the unglamorous middle of the work, where a clear structure and the right word on a button change what a team can do.',
  ],
  beliefs: [
    'Question the brief before answering it.',
    'Make the system legible, then make it beautiful.',
    'Stay close to Engineering. The product is what ships.',
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
    visual: 'targetTracking',
    tone: 'dark',
    card: 'a',
    draft: true,
    title: 'From tracking sustainability targets to making better decisions',
    short: 'Waterplan Target Tracking',
    tags: ['Product Design', 'B2B SaaS', 'AI-driven'],
    company: 'Waterplan',
    role: 'Senior Product Designer',
    scope: 'Target tracking, status model, AI-suggested actions',
    team: 'Product, Engineering, Data',
    lede: 'Companies set water targets easily. Knowing whether they were still reachable, and what to do next, was the hard part.',
    problem: [
      'Customers set water targets (use less, pollute less, protect more) and then lost sight of them. Progress lived in spreadsheets and annual reports, so teams could say whether a number had moved, but not whether the target was still within reach.',
      'The product tracked targets. It did not help anyone decide anything.',
    ],
    hard: [
      'Every target is different: its own metric, baseline year, unit and set of facilities. Data arrives late and incomplete. And the audience runs from analysts who want every row to executives who want one answer.',
      'A single progress bar would have been easy to build, easy to read, and wrong.',
    ],
    role_body: [
      'I led design from problem framing to the shipped interface, working daily with Product, Engineering and Data to decide what the system should know and what it should say.',
    ],
    decisions: [
      {
        title: 'Show the trajectory, not just the percentage',
        chose: 'Progress against time',
        over: 'Percent complete',
        why: 'A target that is 60% done with 90% of the time gone is failing. Percentage alone hides that; a line against the target path does not.',
      },
      {
        title: 'One status model, with its reasons visible',
        chose: 'A single status that explains itself',
        over: 'Custom statuses per team',
        why: 'People trust a status when they can see what produced it. One model kept every team speaking the same language.',
      },
      {
        title: 'Put suggested actions next to the metric',
        chose: 'AI-suggested actions beside the data',
        over: 'A separate assistant to ask',
        why: 'The suggestion makes sense because of the number beside it. Moving it elsewhere would have made it a feature instead of part of the answer.',
      },
    ],
    stages: [
      ['A table of targets and numbers', 'The first version listed every target with its baseline and current value. Accurate, and no help with the question people were really asking.'],
      ['Progress against time', 'Plotting each target against its own path made the gap visible. This is where the product started to answer a question.'],
      ['Status, drivers and next actions', 'The gap gained a name, the reasons behind it, and a suggested next step, all on the same screen.'],
    ],
    shipped: [
      'Target view with trajectory, projected gap and status',
      'Drivers by facility, ranked by their effect on the gap',
      'AI-suggested actions linked to the metric they address',
    ],
    outcome: [
      'Teams stopped rebuilding progress by hand before every review.',
      'Conversations moved from “where are we?” to “what do we do about it?”',
    ],
  },
  {
    slug: 'site-selection',
    visual: 'siteSelection',
    tone: 'light',
    card: 'b',
    draft: true,
    title: 'Turning hundreds of location signals into clear infrastructure decisions',
    short: 'Civarea Site Selection',
    tags: ['Product Design', 'Data Visualization', 'AI-driven'],
    company: 'Civarea',
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
    visual: 'banking',
    tone: 'light',
    card: 'c',
    draft: true,
    title: 'Redesigning a digital banking experience from the ground up',
    short: 'EY Digital Banking',
    tags: ['UX/UI Design', 'Fintech'],
    company: 'EY Design Studio',
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
    visual: 'navigation',
    tone: 'dark',
    card: 'd',
    draft: true,
    title: 'Making a growing platform easier to navigate',
    short: 'Waterplan Platform Navigation',
    tags: ['Product Design', 'UX-UI Design'],
    company: 'Waterplan',
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
