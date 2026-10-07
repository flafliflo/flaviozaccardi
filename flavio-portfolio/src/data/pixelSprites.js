// Pixel-Art-Animationen für die Hobbys.
// Jedes Frame ist ein Raster aus Zeichen; jedes Zeichen steht für eine Farbe aus PALETTE ("." = leer).

export const PALETTE = {
  A: "#d4ff3a", // Akzent
  W: "#f4f4f0", // Weiss
  G: "#7a7a84", // Grau
  D: "#34343c", // Dunkelgrau
  R: "#e10600", // F1-Rot
  B: "#5aa0ff", // Blau
};

// Legt mehrere Sprites in ein w×h-Raster. Mit `wrap` laufen sie seitlich endlos durch.
function compose(w, h, layers) {
  const grid = Array.from({ length: h }, () => Array(w).fill("."));
  for (const { sprite, x, y, wrap } of layers) {
    sprite.forEach((row, dy) => {
      [...row].forEach((ch, dx) => {
        if (ch === ".") return;
        let px = x + dx;
        const py = y + dy;
        if (wrap) px = ((px % w) + w) % w;
        if (px >= 0 && px < w && py >= 0 && py < h) grid[py][px] = ch;
      });
    });
  }
  return grid.map((r) => r.join(""));
}

const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- Reisen: Flugzeug über ziehenden Wolken ---------- */
const PLANE = [
  "A.............",
  "AA............",
  "AWWWWWWWWWWW..",
  "WWBWBWBWBWBWWB",
  ".WWWWWWWWWWWW.",
  ".....WWWW.....",
  "....GGG.......",
];
const CLOUD = ["..GG..", ".GGGG.", "GGGGGG"];
const SMALL_CLOUD = [".DD.", "DDDD"];
const SUN = [".A.", "AAA", ".A."];

const travel = range(20).map((f) =>
  compose(20, 16, [
    { sprite: SUN, x: 16, y: 1 },
    { sprite: SMALL_CLOUD, x: 9 - Math.floor(f / 2) * 2, y: 1, wrap: true },
    { sprite: CLOUD, x: 2 - f, y: 12, wrap: true },
    { sprite: CLOUD, x: 13 - f, y: 10, wrap: true },
    { sprite: ["G.G.G"], x: f % 2 ? 0 : -1, y: 8 + (f % 4 < 2 ? 0 : 1) },
    { sprite: PLANE, x: 4, y: 5 + (f % 4 < 2 ? 0 : 1) },
  ])
);

/* ---------- Gym: Overhead Press mit Langhantel ---------- */
const BARBELL = [
  ".AA..........AA.",
  "AAA..........AAA",
  "AAAGGGGGGGGGGAAA",
  "AAA..........AAA",
  ".AA..........AA.",
];
const HEAD = [".WW.", "WWWW", "WWWW", ".WW."];
const BODY = [
  "WWWWWWWW", // Schultern
  "...WW...",
  "...WW...",
  "..W..W..",
  "..W..W..",
];

const gym = [0, 0, 1, 2, 3, 4, 4, 3, 2, 1].map((barY, f) => {
  const shoulder = 11;
  const barLine = barY + 2;
  const armLen = shoulder - barLine - 1;
  const arm = range(armLen).map(() => "W");
  const layers = [
    { sprite: HEAD, x: 6, y: 7 },
    { sprite: BODY, x: 4, y: shoulder },
    { sprite: arm, x: 4, y: barLine + 1 },
    { sprite: arm, x: 11, y: barLine + 1 },
    { sprite: BARBELL, x: 0, y: barY },
  ];
  // Ellbogen knicken nach aussen, wenn die Hantel unten ist
  if (armLen < 5) {
    layers.push({ sprite: ["W"], x: 3, y: barLine + 2 }, { sprite: ["W"], x: 12, y: barLine + 2 });
  }
  // Schweisstropfen in der Anstrengungsphase
  if (barY >= 3) layers.push({ sprite: ["B", "B"], x: f % 2 ? 13 : 2, y: 9 });
  return compose(16, 16, layers);
});

/* ---------- Formel 1: Auto mit drehenden Rädern und Fahrtwind ---------- */
const car = (spin) => {
  const w = spin ? ["DGD", "DDD", "DGD"] : ["DDD", "DGD", "DDD"];
  return [
    "R.................",
    "RR.......AA.......",
    "RRRRRRRRRAAWRRRR..",
    "RRRRRRRRRRRRRRRRRW",
    `.${w[0]}.RRRRRRR.${w[0]}..`,
    `.${w[1]}.........${w[1]}..`,
    `.${w[2]}.........${w[2]}..`,
  ];
};

const f1 = range(10).map((f) =>
  compose(20, 16, [
    { sprite: ["WW..WW..WW..WW..WW.."], x: -f * 2, y: 15, wrap: true },
    { sprite: ["GGGG"], x: 1 - f * 2, y: 3, wrap: true },
    { sprite: ["AAA"], x: 12 - f * 2, y: 5, wrap: true },
    { sprite: ["GGG"], x: 6 - f * 2, y: 1, wrap: true },
    { sprite: car(f % 2), x: 1, y: 8 + (f % 2) },
  ])
);

/* ---------- Fussball: springender, rotierender Ball ---------- */
const BALL = [
  [
    "..GWWG..",
    ".WWKKWW.",
    "GWKKKKWG",
    "WWWKKWWW",
    "WKWWWWKW",
    "GKKWWKKG",
    ".WKWWKW.",
    "..GWWG..",
  ],
  [
    "..GWWG..",
    ".WKWWKW.",
    "GKKWWKKG",
    "WKWWWWKW",
    "WWWKKWWW",
    "GWKKKKWG",
    ".WWKKWW.",
    "..GWWG..",
  ],
].map((s) => s.map((row) => row.replace(/K/g, "D")));

const football = [0, 1, 3, 5, 7, 5, 3, 1].map((y, f) => {
  const width = 2 + y;
  const layers = [{ sprite: ["D".repeat(width)], x: 8 - Math.floor(width / 2), y: 15 }];
  // Staubwolke beim Aufprall
  if (y === 7) layers.push({ sprite: ["A............A", ".A..........A."], x: 1, y: 13 });
  layers.push({ sprite: BALL[f % 2], x: 4, y });
  return compose(16, 16, layers);
});

export const SPRITES = {
  travel: { w: 20, h: 16, fps: 8, frames: travel },
  gym: { w: 16, h: 16, fps: 7, frames: gym },
  f1: { w: 20, h: 16, fps: 12, frames: f1 },
  football: { w: 16, h: 16, fps: 9, frames: football },
};
