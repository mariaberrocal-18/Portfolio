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
    evolveVisual: 'siteEvolve',
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
    scope: 'Navigation, information hierarchy, data visualization, map and insights',
    team: 'Product, Engineering, Data',
    lede: 'Civarea turns weeks of data center due diligence into hours.',
    context: [
      'Finding the right place to build a data center starts long before construction.',
      'Before committing to a site, teams need to understand whether a location can actually support a data center — from power and water availability to environmental constraints, permitting, connectivity, constructibility, and more.',
      'Civarea was created to bring that early-stage due diligence into one product.',
    ],
    problem: [
      'Critical issues were often discovered too late and the data is scattered all over different systems.',
      'Evaluating a potential site meant gathering information from many different sources and relying on lengthy expert analysis and expensive tools. Teams could spend weeks evaluating a location before uncovering a constraint significant enough to reconsider it.',
      'The question was simple: Can we identify those risks earlier?',
    ],
    hard: [
      'Hundreds of data layers had to make sense in a single experience.',
      'The data was already there, we just needed to grab it and present it in a meaningful way. The design challenge was deciding how to turn it into a usable product: what users needed to see first, how they would move through the assessment, how hundreds of data points could coexist on an interface, and how to reveal detail without overwhelming them.',
    ],
    role_body: [
      'When I joined the project the Product Manager told me “Maria, we need to make this make sense”. My job was to turn the very first iteration of the app (that was designed and developed by engineers) into a product people could actually use.',
      'I redesigned the experience from the ground up around the user’s decision-making process — rethinking navigation, information hierarchy, data visualization, and how users progressively move from a big picture into the smallest of details.',
      'My focus was deciding how much information to show, when to show it, and what users needed to see.',
    ],
    decisions: [
      {
        title: 'Design around how users think',
        chose: 'Structure the navigation around the user’s evaluation flow.',
        over: 'Organizing the product around the underlying data and system structure.',
        why: 'The first iteration exposed information without a clear journey. I reframed the experience around the questions users naturally ask as they evaluate a site.',
      },
      {
        title: 'Make hundreds of layers readable',
        chose: 'Use map layers to progressively reveal different types of information.',
        over: 'Showing all available data at once.',
        why: 'The challenge wasn’t access to data, but making a large amount of spatial information understandable on a single screen.',
      },
      {
        title: 'Answer “so what?”',
        chose: 'Turn findings into insights that explain their relevance and impact.',
        over: 'Simply telling users what the system found.',
        why: 'Knowing that a risk exists isn’t enough. Users need to understand why it matters and what deserves further investigation.',
      },
    ],
    stages: [
      ['Information without structure', 'The first iteration had the data, but the experience was fragmented and difficult to navigate.'],
      ['A product organized around the user', 'Navigation, hierarchy, and visualization were redesigned around how teams actually evaluate a site.'],
      ['From data to insights', 'The experience evolved beyond showing what was found to explaining why it matters and what users should investigate next.'],
    ],
    outcome: [
      'From a collection of data to a product built around decisions.',
      'I turned an early, fragmented interface into a structured site-evaluation experience — creating a clear navigation model, making hundreds of spatial layers easier to explore, and connecting findings to the context users need to decide what to investigate next.',
    ],
    lessons: [
      ['Information hierarchy matters.', 'When everything is important, nothing feels important. Clear hierarchy became essential to making hundreds of layers usable.'],
      ['Trust needs an explanation.', 'For high-stakes decisions, showing a result isn’t enough. Users need to understand where it came from and why it matters.'],
      ['Design for the decision, not the data.', 'The goal wasn’t to expose everything the system knew. It was to surface what users needed to decide what to do next.'],
    ],
  },
  {
    slug: 'digital-banking',
    blurb: 'An app that had grown one feature at a time. I rebuilt it around the few tasks people open it to do, with a component system to hold it together.',
    visual: 'banking',
    evolveVisual: 'bankEvolve',
    tone: 'dark',
    card: 'c',
    draft: true,
    title: 'Redesigning a digital banking experience from the ground up',
    short: 'EY Digital Banking',
    tags: ['UX/UI Design', 'Fintech'],
    company: 'EY Design Studio',
    companyLogo: 'ey-design-studio',
    role: 'UX/UI Senior Designer',
    scope: 'Product architecture, flows, prototyping, testing, handoff',
    team: 'EY design team, Bank engineering',
    clients: ['A leading Ecuadorian bank'],
    lede: 'A leading Ecuadorian bank partnered with EY to rethink its digital banking experience.',
    context: [
      'Redesigning a digital banking experience from the ground up.',
      'A leading Ecuadorian bank partnered with EY to rethink its digital banking experience. A research team had already completed the initial discovery, uncovering customer needs, pain points, and opportunities across the existing experience.',
      'Our design team took those findings into product design.',
    ],
    problem: [
      'Everyday banking was harder than it needed to be.',
      'Customers needed to complete essential tasks — checking their finances, making payments, transferring money, and managing their accounts — that had traditionally been done in person at a bank branch. Now most of those tasks were digital and handled through the banking app.',
      'The opportunity was to rethink those journeys as one coherent, easy-to-use digital banking experience.',
    ],
    hard: [
      'Simple for the customer didn’t mean simple to design.',
      'The design was especially challenging because a large share of the bank’s customers were middle-aged and not used to digital experiences. We had to tread carefully and make every single flow as easy to understand as possible.',
      'Banking flows come with rules, validations, dependencies, edge cases, and technical constraints. The UX challenge was simplifying those journeys for customers without removing the information, controls, and feedback they needed to complete them confidently.',
    ],
    role_body: [
      'I joined after the discovery phase, translating research findings into the product architecture and core banking journeys.',
      'I worked as part of EY’s multinational design team to define flows, design and prototype the new experience, test it with customers, and iterate based on what we learned.',
      'I also worked closely with the bank’s engineering team as the designs moved into development, adapting the experience to technical constraints and supporting the product through launch.',
    ],
    decisions: [
      {
        title: 'Design for people who aren’t used to digital experiences',
        chose: 'Give more weight to an intuitive experience.',
        over: 'Innovation for its own sake.',
        why: 'The redesign was an opportunity to rethink the experience around customer goals, not around being innovative or disruptive.',
      },
      {
        title: 'Make complex flows feel simple',
        chose: 'Break transactions into clear, focused steps with the right information at each moment.',
        over: 'Exposing the complexity of the banking process to the customer.',
        why: 'Transfers, payments, and other banking operations involved significant logic behind the scenes. The interface needed to make that complexity manageable.',
      },
      {
        title: 'Never-ending cycles of testing',
        chose: 'Prototype and test key journeys with customers every single day.',
        over: 'Treating the initial research as enough validation.',
        why: 'Research told us what needed to change; testing showed us whether the new experience actually worked. We even tested every design with our parents, uncles, and aunts. If they could understand the task, we knew we were on the right track.',
      },
    ],
    stages: [
      ['Research into journeys', 'Turn customer insights and pain points into the architecture and core flows of the new experience.'],
      ['Journeys into a product', 'Design, prototype, and connect those flows into a consistent end-to-end banking experience.'],
      ['Product into production', 'Validate with customers, iterate, and work alongside engineering to bring the experience to launch.'],
    ],
    outcome: [
      'From research findings to a banking experience customers could actually use.',
      'I helped translate customer research into an end-to-end digital product, taking core banking journeys from early flows through testing, iteration, and implementation with the bank’s engineering team.',
    ],
    lessons: [
      ['Research is only the starting point.', 'Turning insights into a product requires making hundreds of smaller decisions the research can’t answer for you.'],
      ['Simple experiences hide complexity.', 'The clearer a banking flow feels to the customer, the more carefully its rules, states, and edge cases have usually been designed.'],
      ['Design doesn’t stop at handoff.', 'Working closely with engineering was essential to preserving the experience while adapting it to the realities of implementation.'],
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
    scope: 'Navigation, information architecture, configurable framework',
    team: 'Product, Engineering',
    lede: 'A platform that grew module by module needed a structure organised around what people are trying to do, not how it was built.',
    context: [
      'A platform growing faster than its architecture could support.',
      'As Waterplan grew, so did the number of customers, products, and features. What started as a shared platform was evolving into a much more complex ecosystem, with customers asking for increasingly tailored experiences.',
      'The existing architecture hadn’t been designed for that level of growth or flexibility.',
    ],
    problem: [
      'One platform couldn’t keep working the same way for everyone.',
      'Customers wanted Waterplan to feel more like their own environment — from terminology and branding to how information, metrics, and formulas were presented.',
      'At the same time, new products and features were constantly being introduced, and the existing navigation was running out of room.',
      'Every new request meant figuring out where things could fit, often adding complexity to both the user experience and development.',
    ],
    hard: [
      'How do you make one platform feel like many, without building a different product for every customer?',
      'The UX challenge went beyond reorganizing a sidebar. We needed an architecture that could accommodate more products, support different customer configurations, and remain intuitive regardless of how each organization used the platform.',
      'The difficult part was finding the right balance between a consistent product experience and the flexibility customers expected.',
    ],
    role_body: [
      'I worked on rethinking Waterplan’s navigation and information architecture to support a more flexible, scalable platform.',
      'My focus was understanding how the growing number of modules, customer-specific configurations, and workflows could coexist within a single experience.',
      'That meant reconsidering how the platform was organized, how users moved between products, and how the interface could accommodate different needs without becoming increasingly complex.',
    ],
    decisions: [
      {
        title: 'Build for growth, not just the next feature',
        chose: 'Create a navigation architecture that could accommodate new products and capabilities.',
        over: 'Continuously adapting the existing menu to fit each new request.',
        why: 'The previous structure was reaching its limits, making every addition harder to integrate.',
      },
      {
        title: 'Make room for customer-specific experiences',
        chose: 'Design a shared navigation framework that could support different customer configurations.',
        over: 'Maintaining one rigid experience or creating separate interfaces for individual customers.',
        why: 'Customers needed flexibility, but the product still needed a consistent foundation that Design and Engineering could maintain.',
      },
      {
        title: 'Separate the platform structure from its presentation',
        chose: 'Explore how terminology, branding, and other configurable elements could vary without changing the underlying navigation logic.',
        over: 'Treating every customization request as a separate design problem.',
        why: 'A flexible platform needed to accommodate customer differences without fragmenting the overall experience.',
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
