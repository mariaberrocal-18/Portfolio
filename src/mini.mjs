// Tiny drawings for the three loop cards on the home page (240 x 120).
const wrap = (inner, label) =>
  `<svg class="mini" viewBox="0 0 240 120" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Product thinking: strike the noise, land on the real problem
const thinking = () =>
  wrap(
    `<g class="m-noise">
      ${['Request', 'Assumption', 'Symptom']
        .map(
          (t, i) => `<g transform="translate(14 ${14 + i * 30})">
            <rect width="112" height="24" rx="12" fill="none" stroke="currentColor" stroke-opacity=".28"/>
            <text x="14" y="16.5" font-size="12" fill="currentColor" fill-opacity=".55">${t}</text>
            <line class="m-strike" x1="10" y1="12" x2="102" y2="12" stroke="currentColor" stroke-width="1.4" style="--i:${i}"/>
          </g>`,
        )
        .join('')}
    </g>
    <path class="m-link" d="M130 26 C150 26 150 60 164 60 M130 56 C148 56 150 60 164 60 M130 86 C150 86 150 62 164 62" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="2 4"/>
    <g class="m-real">
      <rect x="164" y="34" width="68" height="52" rx="12" fill="currentColor"/>
      <circle cx="178" cy="47" r="3.5" fill="var(--sage-hi)"/>
      <text x="177" y="68" font-size="11" font-weight="600" fill="var(--paper)">The real</text>
      <text x="177" y="80" font-size="11" font-weight="600" fill="var(--paper)">problem</text>
    </g>`,
    'Three noisy starting points struck through, leading to one highlighted real problem',
  );

// Visual craft: a prompt is typed, components appear
const craft = () =>
  wrap(
    `<defs><clipPath id="m-typeclip"><rect class="m-typerect" x="32" y="6" width="190" height="30"/></clipPath></defs>
    <rect x="8" y="6" width="224" height="30" rx="15" fill="none" stroke="currentColor" stroke-opacity=".3"/>
    <path d="M22 15.5l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="var(--sage-hi)"/>
    <g clip-path="url(#m-typeclip)"><text x="34" y="25" font-size="10.5" font-weight="500" fill="currentColor">Pill button, 40px, primary</text></g>
    <rect class="m-caret" x="34" y="14" width="1.4" height="14" fill="var(--sage-hi)"/>
    <g class="m-gen" style="--i:0"><rect x="14" y="50" width="104" height="38" rx="19" fill="currentColor"/><text x="66" y="73.5" font-size="12" font-weight="600" text-anchor="middle" fill="var(--paper)">Save changes</text></g>
    <g class="m-gen" style="--i:1"><rect x="132" y="56" width="42" height="26" rx="13" fill="var(--sage-hi)"/><circle cx="161" cy="69" r="9.5" fill="var(--paper)"/></g>
    <g class="m-gen" style="--i:2"><rect x="186" y="56" width="40" height="26" rx="8" fill="none" stroke="currentColor" stroke-opacity=".45"/><rect x="194" y="66" width="18" height="4" rx="2" fill="currentColor" fill-opacity=".35"/></g>
    <g class="m-gen" style="--i:3"><rect x="14" y="98" width="212" height="8" rx="4" fill="currentColor" fill-opacity=".1"/><rect x="14" y="98" width="140" height="8" rx="4" fill="currentColor" fill-opacity=".55"/></g>`,
    'An AI prompt typing out a button description, with the generated button, toggle, input and progress bar appearing below',
  );

// Pace: a steady cadence of shipping
const pace = () =>
  wrap(
    `<line x1="14" y1="100" x2="226" y2="100" stroke="currentColor" stroke-opacity=".3"/>
    ${[24, 36, 30, 50, 44, 66, 78]
      .map((h, i) => `<rect class="m-bar" x="${22 + i * 30}" y="${100 - h}" width="18" height="${h}" rx="4" fill="${i === 6 ? 'var(--sage-hi)' : 'currentColor'}" fill-opacity="${i === 6 ? 1 : 0.16 + i * 0.07}" style="--i:${i}"/>`)
      .join('')}
    ${[2, 4, 6]
      .map((i) => `<g class="m-ship" transform="translate(${31 + i * 30} ${100 - [24, 36, 30, 50, 44, 66, 78][i] - 14})" style="--i:${i}"><circle r="6" fill="var(--paper)" stroke="currentColor" stroke-opacity=".5"/><path d="M-2.6 0.2l1.8 1.9 3.4-3.8" fill="none" stroke="var(--sage-hi)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`)
      .join('')}`,
    'A steadily growing row of bars with shipped markers',
  );

export const mini = [thinking, craft, pace];
