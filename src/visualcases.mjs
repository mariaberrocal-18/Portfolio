// Web & Visual Design case pages. One shared structure (vcase.mjs), data per project here.
// Waterplan is the pilot. Mafalda, Gabi López and Palmarium reuse the structure with every slot marked pending:
// nothing about their context, role, visuals, results or tools is invented. Fill a field to replace its pending box.
//
// `draft: true` ships the page with noindex. Copy marked [draft] was written from the brief and from facts already in
// this repo (Waterplan's product context). María must confirm it. Anything not verified is left as `null` (= pending).

export const vcases = [
  {
    slug: 'waterplan',
    name: 'Waterplan',
    tags: ['Art direction', 'Web design', 'AI-assisted imagery'],
    draft: true,
    pilot: true,
    theme: { dark: '#06223a', tide: '#0d4a73', clear: '#bfe0f5', tint: '#eef6fb', accent: '#f2a93b', accentInk: '#06223a' },
    phrase: 'Making the link between territory, data and water-risk decisions visible.',
    shipped: 'Sep 2024',
    duration: '8 months',
    original: {
      about: 'Waterplan is a platform that helps large companies understand and manage their water use. Its customers, such as beverage makers and brewers, commit to water targets and track their progress toward them.',
      audience: 'Large companies with water-dependent operations, and the teams that report and decide on water risk.',
      // pending: the needs and constraints that defined the original work
      needs: null,
      credit: null,
      // screens captured from the published website (not the 2024 version): see `sourceNote`
      materials: [
        { key: 'hero', label: 'Website hero', ar: '16 / 9', src: 'assets/visual/waterplan/original-hero.webp', alt: 'Waterplan website hero: "The AI-native platform for water-dependent industries" over a dotted globe, with client logos' },
        { key: 'risk', label: 'Website · Water Risk section', ar: '16 / 10', src: 'assets/visual/waterplan/original-water-risk.webp', alt: 'Waterplan website section on Water Risk, with a product illustration of a site map and risk score' },
        { key: 'steward', label: 'Website · Water Stewardship section', ar: '16 / 10', src: 'assets/visual/waterplan/original-stewardship.webp', alt: 'Waterplan website section on Water Stewardship, with a product illustration of a project and a map' },
        { key: 'mobile', label: 'Website · mobile hero', ar: '9 / 19', src: 'assets/visual/waterplan/original-mobile-hero.webp', alt: 'Waterplan website hero on a phone' },
      ],
      sourceNote: 'Screens captured from waterplan.com on 26 Oct 2026. The published site may have changed since the project shipped.',
    },
    reimagined: {
      intro: 'This is not a redesign of something that failed, and AI does not make work better on its own. It is a second look: what I would decide differently if I started from the same brief today, and how current tools let me test those decisions quickly.',
      q1: {
        title: 'What would I rethink today?',
        text: 'Water risk is about places: a river, an aquifer, a facility. Water imagery can easily become generic. The opportunity I see is to show how territory, data and decisions connect, so what the platform is for is understood before any screen is opened.',
        decisions: [
          ['Changed', 'Generic water imagery becomes one recognisable territory, seen from above.', 'A specific place makes risk tangible; a stock image makes it abstract.'],
          ['Changed', 'Data graphics sit on the landscape instead of next to it.', 'The relation between a signal and the facility it affects is the message.'],
          ['Kept', null, 'Pending: what carries over from the original, and why.'],
        ],
      },
      q2: {
        title: 'What could I explore further?',
        text: 'Current tools make it fast to try many images, compositions and motion studies. The work is not generating more: it is deciding which layer earns its place, and in what order it should appear.',
        tools: null,
      },
      q3: {
        title: 'What does that become?',
        text: 'The same territory, read in layers: first the ground, then the signals, the relations between them, two scenarios and the actions worth taking first.',
        pairs: [
          { kind: 'pair', original: 'Original website hero', originalKey: 'hero', reimagined: 'hero', caption: 'The hero stops illustrating water and starts showing a decision: a facility, its signals and two scenarios.' },
          { kind: 'pair', original: 'Original Water Risk section', originalKey: 'risk', reimagined: 'section', caption: 'Data and image share one surface. The map is no longer decoration next to the explanation.' },
          { kind: 'new', reimagined: 'motion', caption: 'A new exploration with no original equivalent: switching scenarios and watching a priority list answer.' },
        ],
      },
    },
    direction: {
      intro: 'A visual language that serves one idea: reading a place.',
      type: { h1: 'Water risk, in context.', h2: 'Territory, data and scenarios in one view.', body: 'Body copy stays short and calm. Numbers use tabular figures so comparisons are exact.' },
      typeNotes: ['One family, two weights: confident headlines, quiet body.', 'Large scale for the idea, small for the evidence.'],
      paletteNotes: 'Depth comes from blue; light does the reading; amber appears only when something needs a decision.',
      imageryNotes: ['Aerial, desaturated and cool, so layers read clearly on top.', 'One territory recurs across every piece, so the viewer learns it.'],
      compositionNotes: ['Big image, little text.', 'Layers always follow the same order: ground, signal, relation, scenario, priority.'],
      motionNotes: ['Layers appear in the order of reasoning.', 'Motion explains cause; it never decorates.', 'With reduced motion, the full composition is shown, still.'],
    },
    life: {
      web: {
        brand: 'waterplan',
        nav: ['Platform', 'Solutions', 'Resources', 'Company'],
        navCta: 'Book a demo',
        kicker: 'Independent concept',
        headline: ['Water risk,', 'in context.'],
        sub: 'Territory, data and scenarios in one view, so teams can see what matters and decide what to do first.',
        cta: 'Explore the platform',
        ghost: 'See a scenario',
        card: { title: 'Facility 04 · illustrative', rows: [['Exposure', 'High'], ['Scenarios', '2'], ['Actions', '3']] },
        section: { kicker: 'Compare scenarios', title: 'Two futures, one territory.', text: 'See how a decision changes exposure on the same ground, before committing to it.', chips: ['Scenario A', 'Scenario B'] },
        type: null,
        motion: { metric: 'Exposure index', priorities: ['Protect the water intake', 'Add storage upstream', 'Shift peak withdrawal'] },
        comms: {
          poster: ['Read the', 'territory.'], posterSub: 'Water risk, in context.',
          social: { big: '78 → 49', small: 'Two scenarios. One decision.', tag: 'Illustrative' },
          report: { kicker: 'Concept report', title: ['Water risk,', 'in context'], foot: 'Illustrative cover' },
        },
      },
      mobileNote: 'On mobile the hero keeps one idea: a place, its risk and a single action.',
      motionNote: 'A sequence that shows the idea in seconds: switch the scenario and the exposure and the priorities respond.',
      commsNote: 'Three pieces that reuse the same territory in different formats.',
    },
    process: {
      intro: 'One image, from first prompt to final use.',
      steps: [
        ['Starting point', 'An aerial image of water and territory, and a one-line intention: show how place, data and decisions connect.'],
        ['Alternatives', 'Three directions: photograph with a grid, abstract data forms, and the layered territory.'],
        ['Selection', 'The layered territory. It was the only one where the image and the message were the same thing.'],
        ['Refinement', 'Fewer labels, a single accent colour, and the layer order made consistent.'],
        ['Application', 'Used as the website hero, then adapted to mobile, a poster, a social post and a report cover.'],
      ],
      directed: ['The intention and the layer order', 'What to cut: labels, extra colours, decorative elements', 'Composition, hierarchy and typography'],
      ai: ['Generating and varying aerial territory images', 'Exploring compositions quickly before committing', 'Pending: confirm which tools and which assets'],
      adjusted: ['Rebuilt the layers by hand so they stay precise', 'Re-balanced colour and contrast for legibility', 'Wrote and set every label'],
      tools: null,
    },
    closing: {
      reflection: 'The most useful part of this exploration was not producing images. It was deciding what each layer should say, and what to leave out.',
    },
  },
  { slug: 'mafalda', name: 'Mafalda', tags: ['Category', 'Category'], draft: true, pilot: false },
  { slug: 'gabi-lopez', name: 'Gabi López', tags: ['Category', 'Category'], draft: true, pilot: false },
  { slug: 'palmarium', name: 'Palmarium', tags: ['Category', 'Category'], draft: true, pilot: false },
];
