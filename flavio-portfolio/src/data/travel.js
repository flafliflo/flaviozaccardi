// Reisefotos: Bilder in `public/travel/` ablegen und hier eintragen.
// Beispiel: { src: "travel/rom.webp", place: "Rom", country: "Italien" }
// Querformat-Bilder mit `wide: true` markieren, dann wird die Karte breiter.
// Solange die Liste leer ist, zeigt die Galerie Platzhalter.
const PHOTOS = [
  { src: "travel/new-york-freiheitsstatue.webp", place: "Freiheitsstatue", country: "New York" },
  { src: "travel/new-york-brooklyn-sunset.webp", place: "Brooklyn Bridge", country: "New York" },
  { src: "travel/vierwaldstaettersee.webp", place: "Vierwaldstättersee", country: "Schweiz" },
  { src: "travel/alpstein-grat.webp", place: "Saxer Lücke", country: "Alpstein", wide: true },
  { src: "travel/alpstein-selfie.webp", place: "Ich an der Saxer Lücke", country: "Alpstein" },
  { src: "travel/boston.webp", place: "Public Garden", country: "Boston" },
  { src: "travel/new-york-skyline.webp", place: "Manhattan", country: "New York" },
  { src: "travel/alpstein.webp", place: "Saxer Lücke", country: "Alpstein" },
  { src: "travel/new-york-brooklyn-bridge.webp", place: "Brooklyn Bridge", country: "New York" },
  { src: "travel/new-york-liberty-island.webp", place: "Liberty Island", country: "New York" },
];

// Pfade relativ zur Basis-URL auflösen (relativ zur Seite, siehe vite.config.js)
const TRAVEL_PHOTOS = PHOTOS.map((p) => ({ ...p, src: import.meta.env.BASE_URL + p.src }));

export default TRAVEL_PHOTOS;
