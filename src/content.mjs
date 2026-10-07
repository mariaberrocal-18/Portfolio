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
  lede: 'UX/UI Product design. Let’s reframe problems together.',
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
      'A target is a promise made years in advance. Sustainability teams set it, mostly based on what each site produces: how much water it uses, how much electricity it consumes, how much carbon it emits.',
      'That data lives in facilities all over the world, and collecting it is painful. Spreadsheets, disconnected systems and paper documents all feed into it, and there is too much of it to even begin analyzing. By the time a team has centralized and cleaned the data, it is already old. When they finally saw a gap, it was too late to close it.',
      'The client asked us for a product where they could see their targets and monitor progress in real time, so they could answer the questions that matter: will we make it? And if not, what should we do?',
    ],
    hard: [
      'Every client measures progress in its own way. Each one has its own formulas for calculating certain metrics, its own approach to collecting data, and its own language for reporting.',
      'The same screen had to work for three different clients, all of them leaders in their field. And for each client, the solution had to serve two kinds of readers: analysts who want every detail, and executives who want a simple answer.',
      'A single progress bar, or a dashboard that looks like a spreadsheet, would have been easy to build and easy to read. It would also have been the wrong solution.',
    ],
    role_body: [
      'From the very beginning, I supported the research team in asking the questions that would help us fully understand the pain. I went beyond what the client was telling us. My job was to tell apart what the client asked for from what they actually needed.',
      'It is easy to fall into the trap of doing what we are told, and how we are told to do it, instead of asking more questions, strategic ones, and proposing new paths and solutions.',
    ],
    decisions: [
      {
        title: 'Build a shared framework, not a custom tool for every customer',
        chose: 'A common target-tracking model, flexible enough to support different customers.',
        over: 'Replicating each customer’s existing methodology exactly.',
        why: 'Every company tracked targets differently. The challenge was deciding which needs belonged in the core product and which were too customer-specific to scale.',
      },
      {
        title: 'Grow from tracking into decision-making',
        chose: 'Let users explore and compare combinations of real projects.',
        over: 'Stopping at showing whether a target was on or off track.',
        why: 'Once teams could see they were off track, the natural next question became: what can we actually do about it? That pushed the product from monitoring into scenarios, simulation and prioritization.',
      },
      {
        title: 'Expand the model, not build separate products',
        chose: 'Extend the same product logic across water, carbon and energy.',
        over: 'Creating disconnected experiences for each environmental metric.',
        why: 'As customer needs expanded beyond water, the challenge was to grow the system without fragmenting the experience. Reusing the same core model across carbon and energy made the product easier to scale, learn and maintain.',
      },
    ],
    stages: [
      ['A simple table that centralizes all the information', 'The first version was the trickiest, because first we needed to centralize the data. Once we had it, we could list the targets in a single picture of the data. It was accurate, but it was not tracking anything yet. We were just curating information.'],
      ['Progress towards the target', 'Turning the data into a timeline showed the current situation against the targets, and the gaps became visible for the first time. That let us start asking the next question: now what do we do with this information?'],
      ['From a gap to a plan', 'The idea of simulating scenarios emerged as a strategic tool to support decisions on project investment. Teams could compare scenarios, draft business cases to escalate to their managers, ask for more budget, and forecast data into the future.'],
    ],
    shipped: [
      'A target page showing results over time against the goal',
      'A clear on track or off track status, with how far off',
      'Scenarios: combinations of projects and investment, with their cost and effect',
      'AI-suggested combinations that would reach the target',
    ],
    outcome: [
      'Customers moved workflows previously managed through spreadsheets and Power BI into Waterplan, bringing data, calculations, targets, and project decisions into one place.',
      'What started as a way to answer “Are we on track?” became a way to ask “What should we do next?”',
    ],
    lessons: [
      ['Flexibility has a cost.', 'Supporting different customer methodologies only works when the underlying product model stays clear.'],
      ['The first request is rarely the real problem.', 'Looking beyond what customers asked for often revealed a more scalable problem worth solving.'],
      ['Designing for change matters.', 'After years of iterations, I learned to think beyond the feature in front of me and consider how each decision would hold up as the product evolved.'],
    ],
  },
  {
    slug: 'site-selection',
    blurb: 'Designing an AI-native platform that helps data center teams evaluate sites, uncover critical risks early, and make better decisions before capital is committed.',
    visual: 'siteSelection',
    tone: 'light',
    card: 'b',
    draft: true,
    title: 'From weeks of data center due diligence to hours',
    short: 'Civarea Site Selection',
    tags: ['Product Design', 'Data Visualization', 'AI-driven'],
    company: 'Civarea',
    companyLogos: [['civarea', 'Civarea'], ['waterplan', 'Waterplan']],
    clients: ['A global leader in cloud infrastructure and data centers'],
    role: 'Senior Product Designer',
    scope: 'Site comparison, scoring model, map and shortlist',
    team: 'Product, Engineering, Data',
    lede: 'Civarea turns weeks of data center due diligence into hours.',
    sections: [
      ['The problem', [
        'A bad site decision gets expensive long before construction begins.',
        'Teams can spend months and significant capital evaluating a location before discovering a constraint that makes the site unviable: from power and water availability to permitting, environmental risks or community opposition.',
      ]],
      ['The opportunity', [
        'What if the risks that kill a deal could surface first?',
        'Civarea brings thousands of sources into one assessment, evaluating 280+ risk factors across power, water, constructibility, permitting, connectivity, climate, financial considerations and more.',
      ]],
      ['The design challenge', [
        'Make an enormous amount of due diligence understandable in about two hours.',
        'The challenge wasn’t getting more information onto the screen. It was helping teams understand what matters, how serious it is, why it matters, and what deserves further investigation, without losing the evidence behind each finding.',
      ]],
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
