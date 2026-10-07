// Reisefotos: Bilder in `public/travel/` ablegen und hier eintragen.
// Beispiel: { src: "travel/rom.jpg", place: "Rom", country: "Italien" }
// Solange die Liste leer ist, zeigt die Galerie Platzhalter.
const PHOTOS = [];

// Pfade relativ zur Basis-URL auflösen (relativ zur Seite, siehe vite.config.js)
const TRAVEL_PHOTOS = PHOTOS.map((p) => ({ ...p, src: import.meta.env.BASE_URL + p.src }));

export default TRAVEL_PHOTOS;
