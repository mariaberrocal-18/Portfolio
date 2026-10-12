// Tiny drawings for the three loop cards on the home page (240 x 120).
const wrap = (inner, label) =>
  `<svg class="mini" viewBox="0 -10 240 140" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

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

// Visual Design: a longer prompt is typed, then a whole interface assembles
const craft = () =>
  wrap(
    `<rect x="6" y="-8" width="228" height="36" rx="12" fill="none" stroke="currentColor" stroke-opacity=".3"/>
    <path d="M19 1l1.4 3.6 3.6 1.4-3.6 1.4L19 11l-1.4-3.6L14 6l3.6-1.4z" fill="var(--sage-hi)"/>
    <text x="30" y="5" font-size="8.4" font-weight="500" fill="currentColor" xml:space="preserve"><tspan class="m-ch" style="--k:0">D</tspan><tspan class="m-ch" style="--k:1">a</tspan><tspan class="m-ch" style="--k:2">s</tspan><tspan class="m-ch" style="--k:3">h</tspan><tspan class="m-ch" style="--k:4">b</tspan><tspan class="m-ch" style="--k:5">o</tspan><tspan class="m-ch" style="--k:6">a</tspan><tspan class="m-ch" style="--k:7">r</tspan><tspan class="m-ch" style="--k:8">d</tspan><tspan class="m-ch" style="--k:9"> </tspan><tspan class="m-ch" style="--k:10">f</tspan><tspan class="m-ch" style="--k:11">o</tspan><tspan class="m-ch" style="--k:12">r</tspan><tspan class="m-ch" style="--k:13"> </tspan><tspan class="m-ch" style="--k:14">w</tspan><tspan class="m-ch" style="--k:15">a</tspan><tspan class="m-ch" style="--k:16">t</tspan><tspan class="m-ch" style="--k:17">e</tspan><tspan class="m-ch" style="--k:18">r</tspan><tspan class="m-ch" style="--k:19"> </tspan><tspan class="m-ch" style="--k:20">r</tspan><tspan class="m-ch" style="--k:21">i</tspan><tspan class="m-ch" style="--k:22">s</tspan><tspan class="m-ch" style="--k:23">k</tspan><tspan class="m-ch" style="--k:24">,</tspan></text>
    <text x="30" y="17" font-size="8.4" font-weight="500" fill="currentColor" xml:space="preserve"><tspan class="m-ch" style="--k:25">K</tspan><tspan class="m-ch" style="--k:26">P</tspan><tspan class="m-ch" style="--k:27">I</tspan><tspan class="m-ch" style="--k:28"> </tspan><tspan class="m-ch" style="--k:29">c</tspan><tspan class="m-ch" style="--k:30">a</tspan><tspan class="m-ch" style="--k:31">r</tspan><tspan class="m-ch" style="--k:32">d</tspan><tspan class="m-ch" style="--k:33">s</tspan><tspan class="m-ch" style="--k:34">,</tspan><tspan class="m-ch" style="--k:35"> </tspan><tspan class="m-ch" style="--k:36">t</tspan><tspan class="m-ch" style="--k:37">r</tspan><tspan class="m-ch" style="--k:38">e</tspan><tspan class="m-ch" style="--k:39">n</tspan><tspan class="m-ch" style="--k:40">d</tspan><tspan class="m-ch" style="--k:41"> </tspan><tspan class="m-ch" style="--k:42">c</tspan><tspan class="m-ch" style="--k:43">h</tspan><tspan class="m-ch" style="--k:44">a</tspan><tspan class="m-ch" style="--k:45">r</tspan><tspan class="m-ch" style="--k:46">t</tspan><tspan class="m-ch" style="--k:47">,</tspan><tspan class="m-ch" style="--k:48"> </tspan><tspan class="m-ch" style="--k:49">s</tspan><tspan class="m-ch" style="--k:50">i</tspan><tspan class="m-ch" style="--k:51">t</tspan><tspan class="m-ch" style="--k:52">e</tspan><tspan class="m-ch" style="--k:53"> </tspan><tspan class="m-ch" style="--k:54">t</tspan><tspan class="m-ch" style="--k:55">a</tspan><tspan class="m-ch" style="--k:56">b</tspan><tspan class="m-ch" style="--k:57">l</tspan><tspan class="m-ch" style="--k:58">e</tspan></text>
    <rect class="m-caret m-caret--end" x="152" y="10.5" width="1.2" height="8" fill="var(--sage-hi)"/>
    <g class="m-gen" style="--i:0"><rect x="8" y="38" width="224" height="88" rx="9" fill="#fff" stroke="currentColor" stroke-opacity=".28"/></g>
    <g class="m-gen" style="--i:1"><rect x="8" y="38" width="42" height="88" rx="9" fill="currentColor" fill-opacity=".05"/>
      <rect x="15" y="46" width="12" height="5" rx="2.5" fill="var(--sage-hi)"/>
      ${[60, 70, 80, 90].map((y, j) => `<rect x="15" y="${y}" width="${j === 0 ? 28 : 22 + (j % 2) * 5}" height="4" rx="2" fill="currentColor" fill-opacity="${j === 0 ? 0.55 : 0.2}"/>`).join('')}</g>
    ${[0, 1, 2].map((j) => `<g class="m-gen" style="--i:${2 + j}"><rect x="${58 + j * 58}" y="46" width="52" height="24" rx="6" fill="#fff" stroke="currentColor" stroke-opacity=".25"/><rect x="${64 + j * 58}" y="52" width="20" height="3.5" rx="1.75" fill="currentColor" fill-opacity=".3"/><rect x="${64 + j * 58}" y="59" width="${j === 1 ? 30 : 24}" height="6" rx="2.5" fill="${j === 1 ? 'var(--sage-hi)' : 'currentColor'}" fill-opacity="${j === 1 ? 1 : 0.8}"/></g>`).join('')}
    <g class="m-gen" style="--i:5"><rect x="58" y="76" width="110" height="46" rx="6" fill="#fff" stroke="currentColor" stroke-opacity=".25"/>
      <path d="M64 110 C78 106 84 99 96 100 S116 90 128 92 S150 84 162 82" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M64 114 L162 100" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 3"/></g>
    <g class="m-gen" style="--i:6"><rect x="174" y="76" width="52" height="46" rx="6" fill="#fff" stroke="currentColor" stroke-opacity=".25"/>
      ${[0, 1, 2, 3].map((j) => `<rect x="180" y="${83 + j * 9.5}" width="${34 - j * 5}" height="3.5" rx="1.75" fill="currentColor" fill-opacity="${0.55 - j * 0.1}"/><circle cx="220" cy="${84.8 + j * 9.5}" r="1.8" fill="${j === 0 ? 'var(--sage-hi)' : 'currentColor'}" fill-opacity="${j === 0 ? 1 : 0.25}"/>`).join('')}</g>`,
    'A longer AI prompt being typed, followed by a complete dashboard interface assembling itself: sidebar, KPI cards, trend chart and site table',
  );

// High-pressure, fast-paced: quick iterations streaking toward a shipped release
const pace = () =>
  wrap(
    `${[26, 46, 66, 86, 104].map((y, i) => `<line class="m-streak" x1="${-30 + (i % 2) * 14}" y1="${y}" x2="${52 + ((i * 29) % 70)}" y2="${y}" stroke="currentColor" stroke-opacity="${0.18 + (i % 3) * 0.08}" stroke-width="1.6" stroke-linecap="round" style="--i:${i}"/>`).join('')}
    ${[0, 1, 2].map((i) => `<g class="m-iter" style="--i:${i}" transform="translate(${14 + i * 56} ${34 + (2 - i) * 4})">
      <rect width="44" height="${46 - (2 - i) * 4 + 8}" rx="8" fill="#fff" stroke="currentColor" stroke-opacity="${0.22 + i * 0.2}"/>
      <rect x="7" y="8" width="${18 + i * 6}" height="4" rx="2" fill="currentColor" fill-opacity=".6"/>
      <rect x="7" y="17" width="30" height="3" rx="1.5" fill="currentColor" fill-opacity=".18"/>
      ${i > 0 ? '<rect x="7" y="25" width="30" height="3" rx="1.5" fill="currentColor" fill-opacity=".18"/>' : ''}
      ${i > 1 ? '<rect x="7" y="33" width="16" height="7" rx="3.5" fill="var(--sage-hi)"/>' : ''}
      <text x="22" y="${46 - (2 - i) * 4 + 3}" font-size="7" font-weight="600" text-anchor="middle" fill="currentColor" fill-opacity=".55">v${i + 1}</text></g>`).join('')}
    ${[0, 1].map((i) => `<path class="m-chev" d="M${62 + i * 56} 62 l5 5 -5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="--i:${i}"/>`).join('')}
    <g class="m-shipped"><rect x="184" y="52" width="46" height="26" rx="13" fill="var(--sage-hi)"/><path d="M194 65 l4 4 8 -8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><text x="213" y="68.8" font-size="7.5" font-weight="650" fill="#fff">Live</text></g>`,
    'Three quick iterations, v1 to v3, speeding past motion lines to a shipped release',
  ).replace('viewBox="0 -10 240 140"', 'viewBox="0 18 240 96"');

export const mini = [thinking, craft, pace];
