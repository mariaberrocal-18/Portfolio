// The illustrative data model. Everything the Trace shows (the sentence, the
// evidence rows, the plate, the agreement line, the announcements and the
// text alternatives) is derived from this one object, so the views cannot
// disagree. All values are fictional.

export const model = {
  sleeves: [
    { id: 'cash',     label: 'Cash',             now: 9,  next: 9 },
    { id: 'bonds',    label: 'Government bonds', now: 21, next: 27 },
    { id: 'credit',   label: 'Credit',           now: 14, next: 14 },
    { id: 'equities', label: 'Global equities',  now: 46, next: 40 },
    { id: 'alts',     label: 'Alternatives',     now: 10, next: 10 },
  ],
  risk: { equitiesShare: 71, limit: 60 },
  backtest: { now: -18, next: -13 },
};

const sleeve = (id) => model.sleeves.find((s) => s.id === id);
const eq = sleeve('equities');
const bonds = sleeve('bonds');

const WORDS = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };
const minus = (n) => `−${Math.abs(n)}%`;
const bt = model.backtest;

export const moved = eq.now - eq.next;                       // 6 points
export const excess = model.risk.equitiesShare - model.risk.limit; // 11 points
export const btGap = Math.abs(bt.now - bt.next);              // 5 points

// One line is about ten points of capital, rounded.
export const linesFor = (share) => Math.max(1, Math.round(share / 10));
export const lineCounts = (key) => Object.fromEntries(model.sleeves.map((s) => [s.id, linesFor(s[key])]));

export const claims = [
  {
    id: 1,
    short: 'Risk contribution',
    clause: `Reduce equities by ${WORDS[moved]} points, because they carry <span class="kp">${model.risk.equitiesShare}% of the risk</span> against a ${model.risk.limit}% limit,`,
    title: 'Equity share of portfolio risk',
    summary: `${model.risk.equitiesShare}% · limit ${model.risk.limit}%`,
    value: `${model.risk.equitiesShare}%`,
    desc: `of modeled risk comes from equities, which are ${eq.now}% of capital. The stated limit is ${model.risk.limit}%, so the excess is ${excess} points.`,
    source: 'Portfolio diagnostics · v1',
    scaleNote: 'Scale 0–100% of risk',
    agree: `${model.risk.equitiesShare}%`,
    plateTitle: 'Share of risk',
    read: `Each ring is a sleeve of the portfolio. One line is about ten points of capital, so equities, at ${eq.now}%, carry ${WORDS[linesFor(eq.now)]}. The gold arc measures a share of risk around the circle: ${model.risk.equitiesShare}%. The tick marks the ${model.risk.limit}% limit, and the heavy stretch is the ${excess}-point excess.`,
    alt: `Engraved rosette of five rings, one per portfolio sleeve. Equities, the outer gold ring, has ${WORDS[linesFor(eq.now)]} lines for ${eq.now} percent of capital. A gold arc runs ${model.risk.equitiesShare} percent of the way around the circle. A tick marks the ${model.risk.limit} percent limit, and the heavy stretch between the tick and the end of the arc is the ${excess}-point excess. Illustrative data.`,
    announce: `Claim 1 of 3 selected. Equity share of portfolio risk: ${model.risk.equitiesShare} percent against a ${model.risk.limit} percent limit, an excess of ${excess} points. Evidence and plate updated. Illustrative data.`,
  },
  {
    id: 2,
    short: 'Proposed allocation',
    clause: `move that weight into <span class="kp">government bonds</span>,`,
    title: 'Proposed allocation',
    summary: `Equities ${eq.now} → ${eq.next} · Bonds ${bonds.now} → ${bonds.next}`,
    value: `${moved} pts`,
    desc: `move from global equities to government bonds. Equities go from ${eq.now}% to ${eq.next}% of capital; bonds from ${bonds.now}% to ${bonds.next}%.`,
    source: 'Proposal · v1',
    scaleNote: 'Scale 0–50% of capital',
    agree: `${moved} pts`,
    plateTitle: 'Capital, before and after',
    read: `One line is about ten points of capital. Equities go from ${WORDS[linesFor(eq.now)]} lines to ${WORDS[linesFor(eq.next)]}: the dashed line is the one removed. Government bonds go from ${WORDS[linesFor(bonds.now)]} lines to ${WORDS[linesFor(bonds.next)]}: the heavy line is the one added. The arrow marks the ${WORDS[moved]} points moved.`,
    alt: `The same engraved rosette, before and after the proposal. Equities go from ${linesFor(eq.now)} lines to ${linesFor(eq.next)}; the removed line is dashed. Government bonds go from ${linesFor(bonds.now)} lines to ${linesFor(bonds.next)}; the added line is heavy. An arrow from the equities ring to the bonds ring marks ${moved} points moved. Illustrative data.`,
    announce: `Claim 2 of 3 selected. Proposed allocation: ${moved} points move from equities to government bonds. Equities ${eq.now} to ${eq.next} percent, bonds ${bonds.now} to ${bonds.next} percent. Evidence and plate updated. Illustrative data.`,
  },
  {
    id: 3,
    short: 'Backtest drawdown',
    clause: `and the backtest’s worst drawdown narrows from <span class="kp kp--nowrap">${minus(bt.now)} to ${minus(bt.next)}</span>.`,
    title: 'Backtest, worst drawdown',
    summary: `${minus(bt.now)} → ${minus(bt.next)}`,
    value: minus(bt.next),
    desc: `is the worst fall in the illustrative backtest, down from ${minus(bt.now)}. The difference is ${btGap} points.`,
    source: 'Backtest report',
    scaleNote: 'Scale 0–20% drawdown',
    agree: minus(bt.next),
    plateTitle: 'Backtest, worst drawdown',
    read: `The curves show the illustrative backtest, with 0% at the top and −20% at the bottom. Blush is the portfolio now; gold is the proposal. The heavy stretch at the worst point is the ${btGap}-point difference, ${minus(bt.now)} against ${minus(bt.next)}.`,
    alt: `Two curves from an illustrative backtest on a scale from 0 to minus 20 percent. The portfolio now falls to minus ${Math.abs(bt.now)} percent at its worst; the proposal falls only to minus ${Math.abs(bt.next)} percent. A heavy gold stretch at the worst point marks the ${btGap}-point difference.`,
    announce: `Claim 3 of 3 selected. Backtest, worst drawdown: ${minus(bt.next)}, down from ${minus(bt.now)}, a difference of ${btGap} points. Evidence and plate updated. Illustrative data.`,
  },
];

export const TOTAL = claims.length;
