// ─── IELTS Task 1 SVG Chart Generators ────────────────────────────────────────
// Produces clean 760×420 SVG strings for all IELTS chart types.

const W = 760, H = 420;
const PL = 80, PR = 24, PT = 52, PB = 54; // padding left/right/top/bottom
const IW = W - PL - PR;   // 656 inner width
const IH = H - PT - PB;   // 314 inner height

export const CHART_COLORS = [
  "#7c3aed", "#16a34a", "#16a34a", "#ea580c",
  "#db2777", "#0891b2", "#ca8a04", "#4f46e5",
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function header(title: string, sub?: string) {
  return (
    `<text x="${W / 2}" y="20" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">${esc(title)}</text>` +
    (sub ? `<text x="${W / 2}" y="38" text-anchor="middle" font-size="11" fill="#555">${esc(sub)}</text>` : "")
  );
}

function axes() {
  return (
    `<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT + IH}" stroke="#888" stroke-width="1.5"/>` +
    `<line x1="${PL}" y1="${PT + IH}" x2="${PL + IW}" y2="${PT + IH}" stroke="#888" stroke-width="1.5"/>`
  );
}

function yGrid(yMin: number, yMax: number, steps = 5, unit = "") {
  let out = "";
  const range = yMax - yMin;
  for (let i = 0; i <= steps; i++) {
    const v = yMin + (range * i) / steps;
    const y = PT + IH - (i / steps) * IH;
    const label = Number.isInteger(v) ? String(Math.round(v)) : v.toFixed(1);
    out += `<line x1="${PL}" y1="${y}" x2="${PL + IW}" y2="${y}" stroke="#eee" stroke-width="1"/>`;
    out += `<text x="${PL - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#555">${label}${unit}</text>`;
  }
  return out;
}

function legend(
  items: { name: string; color: string }[],
  y = H - 12,
) {
  const total = items.length * 110;
  const sx = Math.max(40, (W - total) / 2);
  return items
    .map(({ name, color }, i) => {
      const x = sx + i * 110;
      return (
        `<rect x="${x}" y="${y - 8}" width="18" height="5" fill="${color}"/>` +
        `<text x="${x + 22}" y="${y}" font-size="11" fill="#333">${esc(name)}</text>`
      );
    })
    .join("");
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Line Graph ──────────────────────────────────────────────────────────────
export interface LineConfig {
  title: string;
  sub?: string;
  xLabels: string[];
  yMin?: number;
  yMax: number;
  yUnit?: string;
  ySteps?: number;
  series: { name: string; data: number[]; color?: string }[];
}

export function lineGraph(c: LineConfig): string {
  const yMin = c.yMin ?? 0;
  const n = c.xLabels.length;
  const toX = (i: number) => PL + (i / (n - 1)) * IW;
  const toY = (v: number) => PT + IH - ((v - yMin) / (c.yMax - yMin)) * IH;

  const every = Math.max(1, Math.ceil(n / 9));

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);
  out += axes();
  out += yGrid(yMin, c.yMax, c.ySteps ?? 5, c.yUnit ?? "");

  // X labels
  c.xLabels.forEach((lbl, i) => {
    if (i % every === 0 || i === n - 1)
      out += `<text x="${toX(i)}" y="${PT + IH + 15}" text-anchor="middle" font-size="10" fill="#555">${esc(lbl)}</text>`;
  });

  // Series
  c.series.forEach(({ name: _n, data, color }, si) => {
    const col = color ?? CHART_COLORS[si % CHART_COLORS.length];
    const pts = data.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
    out += `<polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    data.forEach((v, i) => {
      out += `<circle cx="${toX(i).toFixed(1)}" cy="${toY(v).toFixed(1)}" r="3.5" fill="${col}"/>`;
    });
  });

  out += legend(c.series.map((s, i) => ({ name: s.name, color: s.color ?? CHART_COLORS[i % CHART_COLORS.length] })));
  out += "</svg>";
  return out;
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────
export interface BarConfig {
  title: string;
  sub?: string;
  labels: string[];
  yMax: number;
  yUnit?: string;
  ySteps?: number;
  color?: string;
  data: number[];
  horizontal?: boolean;
}

export function barChart(c: BarConfig): string {
  const n = c.labels.length;
  const col = c.color ?? CHART_COLORS[0];
  const barW = Math.min(50, (IW / n) * 0.6);
  const gap = IW / n;
  const toY = (v: number) => PT + IH - (v / c.yMax) * IH;

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);
  out += axes();
  out += yGrid(0, c.yMax, c.ySteps ?? 5, c.yUnit ?? "");

  c.labels.forEach((lbl, i) => {
    const cx = PL + gap * i + gap / 2;
    const h = (c.data[i] / c.yMax) * IH;
    const y = PT + IH - h;
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" fill="${col}" opacity="0.88"/>`;
    // value label on bar
    out += `<text x="${cx.toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="${col}" font-weight="bold">${c.data[i]}${c.yUnit ?? ""}</text>`;
    // x-axis label
    const short = lbl.length > 10 ? lbl.slice(0, 10) + "…" : lbl;
    out += `<text x="${cx.toFixed(1)}" y="${PT + IH + 15}" text-anchor="middle" font-size="10" fill="#555">${esc(short)}</text>`;
  });

  out += "</svg>";
  return out;
}

// ─── Grouped Bar Chart ────────────────────────────────────────────────────────
export interface GroupedBarConfig {
  title: string;
  sub?: string;
  groups: string[];
  yMax: number;
  yUnit?: string;
  ySteps?: number;
  series: { name: string; data: number[]; color?: string }[];
}

export function groupedBar(c: GroupedBarConfig): string {
  const ng = c.groups.length;
  const ns = c.series.length;
  const groupW = IW / ng;
  const barW = Math.min(28, (groupW * 0.8) / ns);
  const toY = (v: number) => PT + IH - (v / c.yMax) * IH;

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);
  out += axes();
  out += yGrid(0, c.yMax, c.ySteps ?? 5, c.yUnit ?? "");

  c.groups.forEach((grp, gi) => {
    const cx = PL + groupW * gi + groupW / 2;
    const totalW = barW * ns + 2 * (ns - 1);
    const startX = cx - totalW / 2;

    c.series.forEach(({ data, color }, si) => {
      const col = color ?? CHART_COLORS[si % CHART_COLORS.length];
      const x = startX + si * (barW + 2);
      const h = (data[gi] / c.yMax) * IH;
      const y = toY(data[gi]);
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" fill="${col}" opacity="0.88"/>`;
    });

    const short = grp.length > 10 ? grp.slice(0, 10) + "…" : grp;
    out += `<text x="${cx.toFixed(1)}" y="${PT + IH + 15}" text-anchor="middle" font-size="10" fill="#555">${esc(short)}</text>`;
  });

  out += legend(c.series.map((s, i) => ({ name: s.name, color: s.color ?? CHART_COLORS[i % CHART_COLORS.length] })));
  out += "</svg>";
  return out;
}

// ─── Pie Chart (1 or 2 side-by-side) ─────────────────────────────────────────
export interface PieConfig {
  title: string;
  sub?: string;
  pies: {
    label: string;
    slices: { name: string; value: number; color: string }[];
  }[];
}

export function pieChart(c: PieConfig): string {
  function drawPie(
    cx: number, cy: number, r: number,
    slices: { name: string; value: number; color: string }[],
  ) {
    const total = slices.reduce((s, x) => s + x.value, 0);
    let angle = -Math.PI / 2;
    let out = "";
    slices.forEach(({ value, color }) => {
      const sweep = (value / total) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      const x2 = cx + r * Math.cos(angle + sweep);
      const y2 = cy + r * Math.sin(angle + sweep);
      const large = sweep > Math.PI ? 1 : 0;
      // label position
      const mid = angle + sweep / 2;
      const lx = cx + r * 0.65 * Math.cos(mid);
      const ly = cy + r * 0.65 * Math.sin(mid);
      const pct = Math.round((value / total) * 100);
      out += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}"/>`;
      if (pct >= 5)
        out += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">${pct}%</text>`;
      angle += sweep;
    });
    return out;
  }

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);

  if (c.pies.length === 1) {
    const pie = c.pies[0];
    out += drawPie(W / 2, (PT + H - 60) / 2 + PT / 2, 130, pie.slices);
    // legend
    const allSlices = pie.slices;
    const lStartX = Math.max(20, (W - allSlices.length * 120) / 2);
    allSlices.forEach(({ name, color }, i) => {
      const x = lStartX + i * 120;
      out += `<rect x="${x}" y="${H - 30}" width="14" height="14" fill="${color}"/>`;
      out += `<text x="${x + 18}" y="${H - 19}" font-size="11" fill="#333">${esc(name)}</text>`;
    });
  } else {
    // Two pies side by side
    const r = 105;
    const centres = [W / 4, (3 * W) / 4];
    c.pies.forEach((pie, pi) => {
      const cx = centres[pi];
      const cy = (PT + H - 50) / 2 + 15;
      out += `<text x="${cx}" y="${PT + 12}" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">${esc(pie.label)}</text>`;
      out += drawPie(cx, cy, r, pie.slices);
    });
    // shared legend (use first pie's slices)
    const allSlices = c.pies[0].slices;
    const lStartX = Math.max(20, (W - allSlices.length * 120) / 2);
    allSlices.forEach(({ name, color }, i) => {
      const x = lStartX + i * 120;
      out += `<rect x="${x}" y="${H - 26}" width="14" height="14" fill="${color}"/>`;
      out += `<text x="${x + 18}" y="${H - 15}" font-size="11" fill="#333">${esc(name)}</text>`;
    });
  }

  out += "</svg>";
  return out;
}

// ─── Table ────────────────────────────────────────────────────────────────────
export interface TableConfig {
  title: string;
  sub?: string;
  headers: string[];
  rows: (string | number)[][];
}

export function dataTable(c: TableConfig): string {
  const ncols = c.headers.length;
  const nrows = c.rows.length;
  const tableW = W - 80;
  const startX = 40;
  const startY = PT + 8;
  const rowH = Math.min(36, (H - startY - 30) / (nrows + 1));
  const colW = tableW / ncols;

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);

  // Header row
  out += `<rect x="${startX}" y="${startY}" width="${tableW}" height="${rowH}" fill="#7c3aed"/>`;
  c.headers.forEach((h, i) => {
    const cx = startX + colW * i + colW / 2;
    out += `<text x="${cx.toFixed(1)}" y="${(startY + rowH * 0.65).toFixed(1)}" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">${esc(h)}</text>`;
  });

  // Data rows
  c.rows.forEach((row, ri) => {
    const y = startY + rowH * (ri + 1);
    out += `<rect x="${startX}" y="${y}" width="${tableW}" height="${rowH}" fill="${ri % 2 === 0 ? "#f5f3ff" : "#fff"}"/>`;
    row.forEach((cell, ci) => {
      const cx = startX + colW * ci + colW / 2;
      out += `<text x="${cx.toFixed(1)}" y="${(y + rowH * 0.65).toFixed(1)}" text-anchor="middle" font-size="11" fill="#222">${esc(String(cell))}</text>`;
    });
    // grid line
    out += `<line x1="${startX}" y1="${y}" x2="${startX + tableW}" y2="${y}" stroke="#ccc" stroke-width="1"/>`;
  });

  // Outer border + column lines
  const totalH = rowH * (nrows + 1);
  out += `<rect x="${startX}" y="${startY}" width="${tableW}" height="${totalH}" fill="none" stroke="#ccc" stroke-width="1"/>`;
  for (let ci = 1; ci < ncols; ci++) {
    const x = startX + colW * ci;
    out += `<line x1="${x.toFixed(1)}" y1="${startY}" x2="${x.toFixed(1)}" y2="${(startY + totalH).toFixed(1)}" stroke="#ccc" stroke-width="1"/>`;
  }

  out += "</svg>";
  return out;
}

// ─── Process / Flow Diagram ───────────────────────────────────────────────────
export interface ProcessConfig {
  title: string;
  sub?: string;
  steps: string[];
  color?: string;
  layout?: "horizontal" | "vertical" | "snake"; // snake = 2-row wrap
}

export function processDiagram(c: ProcessConfig): string {
  // Vibrant multi-step palette — each card gets its own colour
  const PALETTE = [
    ["#6366f1","#4f46e5"], // indigo
    ["#0ea5e9","#0284c7"], // sky
    ["#10b981","#059669"], // emerald
    ["#f59e0b","#d97706"], // amber
    ["#ef4444","#dc2626"], // red
    ["#8b5cf6","#7c3aed"], // violet
    ["#06b6d4","#0891b2"], // cyan
    ["#84cc16","#65a30d"], // lime
  ];
  const n = c.steps.length;
  const layout = c.layout ?? (n <= 5 ? "horizontal" : "snake");

  // card dimensions
  const GAP = 28;
  const BH = 100; // card height
  const BW_H = Math.min(130, Math.floor((IW - GAP * (n - 1)) / n)); // horizontal card width
  const HEADER_H = 36; // coloured top band height
  const R = 12; // corner radius

  function wrapText(text: string, maxChars: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let cur = "";
    words.forEach(w => {
      if (cur && (cur + " " + w).length > maxChars) { lines.push(cur); cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  function drawCard(x: number, y: number, step: string, idx: number): string {
    const [c1, c2] = PALETTE[idx % PALETTE.length];
    const mid = x + BW_H / 2;
    let s = "";
    const uid = `g${idx}`;
    // shadow
    s += `<rect x="${x+3}" y="${y+3}" width="${BW_H}" height="${BH}" rx="${R}" fill="rgba(0,0,0,0.12)"/>`;
    // card body (white)
    s += `<rect x="${x}" y="${y}" width="${BW_H}" height="${BH}" rx="${R}" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>`;
    // coloured header band
    s += `<defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>`;
    s += `<path d="M${x+R},${y} h${BW_H-2*R} a${R},${R} 0 0 1 ${R},${R} v${HEADER_H-R} h-${BW_H} v-${HEADER_H-R} a${R},${R} 0 0 1 ${R},-${R}z" fill="url(#${uid})"/>`;
    // step number badge
    s += `<circle cx="${mid}" cy="${y + HEADER_H / 2}" r="13" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>`;
    s += `<text x="${mid}" y="${y + HEADER_H / 2 + 4.5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">${idx + 1}</text>`;
    // step text (wrapped, centred in lower card area)
    const lines = wrapText(step, Math.floor(BW_H / 7.5));
    const textAreaY = y + HEADER_H;
    const textAreaH = BH - HEADER_H;
    const lineH = 14;
    const totalTextH = lines.length * lineH;
    const startY = textAreaY + (textAreaH - totalTextH) / 2 + 11;
    lines.forEach((line, li) => {
      s += `<text x="${mid}" y="${startY + li * lineH}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#374151">${esc(line)}</text>`;
    });
    return s;
  }

  function drawArrowH(x: number, cy: number, col: string): string {
    return (
      `<line x1="${x}" y1="${cy}" x2="${x + GAP - 6}" y2="${cy}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<polygon points="${x+GAP-6},${cy-5} ${x+GAP+1},${cy} ${x+GAP-6},${cy+5}" fill="${col}"/>`
    );
  }

  function drawArrowDown(cx: number, y1: number, y2: number, col: string): string {
    return (
      `<line x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2-6}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<polygon points="${cx-5},${y2-6} ${cx},${y2+1} ${cx+5},${y2-6}" fill="${col}"/>`
    );
  }

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#f8fafc;">`;
  // light grid bg
  out += `<rect width="${W}" height="${H}" fill="#f8fafc"/>`;
  out += header(c.title, c.sub);

  if (layout === "horizontal") {
    const totalW = BW_H * n + GAP * (n - 1);
    const sx = (W - totalW) / 2;
    const cardY = PT + (IH - BH) / 2;

    c.steps.forEach((step, i) => {
      const x = sx + i * (BW_H + GAP);
      out += drawCard(x, cardY, step, i);
      if (i < n - 1) {
        const [c1] = PALETTE[i % PALETTE.length];
        out += drawArrowH(x + BW_H, cardY + BH / 2, c1);
      }
    });

  } else {
    // Snake: top row L→R, bottom row R→L
    const half = Math.ceil(n / 2);
    const BW_S = Math.min(120, Math.floor((IW - GAP * (half - 1)) / half));
    const totalW = BW_S * half + GAP * (half - 1);
    const sx = (W - totalW) / 2;
    const ROW_GAP = 44;
    const row1Y = PT + 18;
    const row2Y = row1Y + BH + ROW_GAP;

    // override BW_H for snake (local helper)
    function drawCardS(x: number, y: number, step: string, idx: number): string {
      const [c1, c2] = PALETTE[idx % PALETTE.length];
      const mid = x + BW_S / 2;
      let s = "";
      const uid = `gs${idx}`;
      s += `<rect x="${x+3}" y="${y+3}" width="${BW_S}" height="${BH}" rx="${R}" fill="rgba(0,0,0,0.10)"/>`;
      s += `<rect x="${x}" y="${y}" width="${BW_S}" height="${BH}" rx="${R}" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>`;
      s += `<defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>`;
      s += `<path d="M${x+R},${y} h${BW_S-2*R} a${R},${R} 0 0 1 ${R},${R} v${HEADER_H-R} h-${BW_S} v-${HEADER_H-R} a${R},${R} 0 0 1 ${R},-${R}z" fill="url(#${uid})"/>`;
      s += `<circle cx="${mid}" cy="${y + HEADER_H / 2}" r="12" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>`;
      s += `<text x="${mid}" y="${y + HEADER_H / 2 + 4.5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">${idx + 1}</text>`;
      const lines = wrapText(step, Math.floor(BW_S / 7));
      const textAreaY = y + HEADER_H;
      const textAreaH = BH - HEADER_H;
      const lineH = 14;
      const totalTextH = lines.length * lineH;
      const startY = textAreaY + (textAreaH - totalTextH) / 2 + 11;
      lines.forEach((line, li) => {
        s += `<text x="${mid}" y="${startY + li * lineH}" text-anchor="middle" font-size="10" font-weight="600" fill="#374151">${esc(line)}</text>`;
      });
      return s;
    }

    c.steps.forEach((step, i) => {
      const inRow2 = i >= half;
      const rowIdx = inRow2 ? (n - 1 - i) : i;
      const x = sx + rowIdx * (BW_S + GAP);
      const y = inRow2 ? row2Y : row1Y;
      out += drawCardS(x, y, step, i);

      const [col1] = PALETTE[i % PALETTE.length];

      if (!inRow2 && i < half - 1) {
        // right arrow on row 1
        out += drawArrowH(x + BW_S, y + BH / 2, col1);
      }
      if (i === half - 1 && n > half) {
        // down arrow at end of row 1
        const cx = x + BW_S / 2;
        out += drawArrowDown(cx, y + BH, row2Y, col1);
      }
      if (inRow2 && i < n - 1) {
        // left arrow on row 2
        const arrowEndX = x - GAP + 6;
        out += (
          `<line x1="${x}" y1="${y + BH / 2}" x2="${arrowEndX + 6}" y2="${y + BH / 2}" stroke="${col1}" stroke-width="2.5" stroke-linecap="round"/>` +
          `<polygon points="${arrowEndX+6},${y+BH/2-5} ${arrowEndX-1},${y+BH/2} ${arrowEndX+6},${y+BH/2+5}" fill="${col1}"/>`
        );
      }
    });
  }

  out += "</svg>";
  return out;
}
