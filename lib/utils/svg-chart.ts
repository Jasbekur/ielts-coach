// ─── IELTS Task 1 SVG Chart Generators ────────────────────────────────────────
// Produces clean 760×420 SVG strings for all IELTS chart types.

const W = 760, H = 420;
const PL = 80, PR = 24, PT = 52, PB = 54; // padding left/right/top/bottom
const IW = W - PL - PR;   // 656 inner width
const IH = H - PT - PB;   // 314 inner height

export const CHART_COLORS = [
  "#7c3aed", "#2563eb", "#16a34a", "#ea580c",
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
  const col = c.color ?? "#7c3aed";
  const n = c.steps.length;
  const layout = c.layout ?? (n <= 5 ? "horizontal" : "snake");

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:Arial,sans-serif;background:#fff;">`;
  out += header(c.title, c.sub);

  if (layout === "horizontal") {
    const bw = Math.min(110, (IW - 20 * (n - 1)) / n);
    const bh = 60;
    const totalW = bw * n + 20 * (n - 1);
    const sx = (W - totalW) / 2;
    const cy = PT + IH / 2;

    c.steps.forEach((step, i) => {
      const x = sx + i * (bw + 20);
      out += `<rect x="${x}" y="${cy - bh / 2}" width="${bw}" height="${bh}" rx="8" fill="${col}" opacity="0.15" stroke="${col}" stroke-width="1.5"/>`;
      // wrap text
      const words = step.split(" ");
      const lines: string[] = [];
      let cur = "";
      words.forEach(w => {
        if ((cur + " " + w).length > 14 && cur) { lines.push(cur); cur = w; }
        else cur = cur ? cur + " " + w : w;
      });
      lines.push(cur);
      lines.forEach((line, li) => {
        const lineY = cy - ((lines.length - 1) * 13) / 2 + li * 13 + 4;
        out += `<text x="${x + bw / 2}" y="${lineY}" text-anchor="middle" font-size="10" fill="${col}" font-weight="bold">${esc(line)}</text>`;
      });
      // Step number
      out += `<circle cx="${x + 14}" cy="${cy - bh / 2 - 10}" r="10" fill="${col}"/>`;
      out += `<text x="${x + 14}" y="${cy - bh / 2 - 6}" text-anchor="middle" font-size="10" fill="#fff" font-weight="bold">${i + 1}</text>`;
      // Arrow
      if (i < n - 1) {
        const ax = x + bw + 10;
        out += `<line x1="${x + bw}" y1="${cy}" x2="${ax}" y2="${cy}" stroke="${col}" stroke-width="2"/>`;
        out += `<polygon points="${ax},${cy - 5} ${ax + 8},${cy} ${ax},${cy + 5}" fill="${col}"/>`;
      }
    });
  } else {
    // Snake layout: top row L→R, bottom row R→L
    const half = Math.ceil(n / 2);
    const bw = Math.min(110, (IW - 20 * (half - 1)) / half);
    const bh = 56;
    const totalW = bw * half + 20 * (half - 1);
    const sx = (W - totalW) / 2;
    const row1Y = PT + 60;
    const row2Y = PT + 60 + bh + 60;

    c.steps.forEach((step, i) => {
      const inRow2 = i >= half;
      const rowIdx = inRow2 ? (n - 1 - i) : i;
      const x = sx + rowIdx * (bw + 20);
      const cy = inRow2 ? row2Y : row1Y;

      out += `<rect x="${x}" y="${cy}" width="${bw}" height="${bh}" rx="8" fill="${col}" opacity="0.15" stroke="${col}" stroke-width="1.5"/>`;
      const words = step.split(" ");
      const lines: string[] = [];
      let cur = "";
      words.forEach(w => {
        if ((cur + " " + w).length > 14 && cur) { lines.push(cur); cur = w; }
        else cur = cur ? cur + " " + w : w;
      });
      lines.push(cur);
      lines.forEach((line, li) => {
        const lineY = cy + bh / 2 - ((lines.length - 1) * 13) / 2 + li * 13 + 2;
        out += `<text x="${x + bw / 2}" y="${lineY}" text-anchor="middle" font-size="10" fill="${col}" font-weight="bold">${esc(line)}</text>`;
      });
      out += `<circle cx="${x + 14}" cy="${cy - 10}" r="10" fill="${col}"/>`;
      out += `<text x="${x + 14}" y="${cy - 6}" text-anchor="middle" font-size="10" fill="#fff" font-weight="bold">${i + 1}</text>`;

      // Arrow forward (within rows)
      if (i < half - 1) {
        const ax = x + bw + 10;
        out += `<line x1="${x + bw}" y1="${cy + bh / 2}" x2="${ax}" y2="${cy + bh / 2}" stroke="${col}" stroke-width="2"/>`;
        out += `<polygon points="${ax},${cy + bh / 2 - 5} ${ax + 8},${cy + bh / 2} ${ax},${cy + bh / 2 + 5}" fill="${col}"/>`;
      }
      if (i === half - 1 && n > half) {
        // Down arrow
        const fx = x + bw / 2;
        out += `<line x1="${fx}" y1="${cy + bh}" x2="${fx}" y2="${row2Y - 10}" stroke="${col}" stroke-width="2"/>`;
        out += `<polygon points="${fx - 5},${row2Y - 10} ${fx},${row2Y} ${fx + 5},${row2Y - 10}" fill="${col}"/>`;
      }
      if (inRow2 && i < n - 1) {
        const nextRowIdx = n - 1 - (i + 1);
        const nx = sx + nextRowIdx * (bw + 20);
        const arrowX = x - 10;
        out += `<line x1="${x}" y1="${cy + bh / 2}" x2="${arrowX}" y2="${cy + bh / 2}" stroke="${col}" stroke-width="2"/>`;
        out += `<polygon points="${arrowX},${cy + bh / 2 - 5} ${arrowX - 8},${cy + bh / 2} ${arrowX},${cy + bh / 2 + 5}" fill="${col}"/>`;
        void nx;
      }
    });
  }

  out += "</svg>";
  return out;
}
