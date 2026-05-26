const places = [
  "Gullwhisper Spit",
  "The Ninth Lantern Archipelago",
  "Cinderwell Station",
  "Mothglass Harbor",
  "Salt Cathedral",
  "Old Meridian Hollow",
  "The Ink Plains",
  "Bracken Moon Ferry",
  "Rook & Tide",
  "Velvet Quarry",
  "Nocturne Crossing",
  "Pale Engine Bay",
  "Fogkeeper's Reach",
  "Hearthless Peninsula"
];

const skies = [
  "A low ceiling of moonlit ash drifts over the district.",
  "Thin rain threads the dark like loose silver wire.",
  "Cloudbanks glow faintly, as if lit from underwater.",
  "The stars have gone behind bruised slate and will not answer.",
  "A clear interval opens briefly, then folds shut again.",
  "Pearl-gray mist climbs the rooftops before dawn can object.",
  "Lantern-colored clouds linger at the edge of the bay.",
  "A patient overcast settles in and refuses departure.",
  "Cold light leaks through fractured cloud in narrow bands.",
  "The horizon burns amber, then dims to ink.",
  "Storm glass tones gather without thunder yet.",
  "High cirrus trails resemble handwriting nobody can read.",
  "Snowlight hangs in the air though no flakes commit.",
  "Night fog beads on windows like unfinished constellations."
];

const air = [
  "Wind moves east at a librarian's pace, turning signs one syllable at a time.",
  "Harbor gusts arrive in polite bursts, then retreat to listen.",
  "The air carries iron, wet cedar, and a rumor of lightning.",
  "Pressure falls gently; doors may speak in their hinges.",
  "A river-cold draft crosses the streets and edits every conversation.",
  "Warmth rises from cobblestone vents, meeting the chill halfway.",
  "Northern currents comb the cranes and leave a violin hum.",
  "Static gathers in coat sleeves and in unspoken decisions.",
  "Sea breath rolls inland, salt-rich and deliberate.",
  "The atmosphere is still enough to hear clock towers blink.",
  "Crosswinds braid over the bridge with careful hands.",
  "Anise-sweet haze lingers low, softening distant engines.",
  "The barometer steadies, but the alleys keep their weather.",
  "Dry currents from the interior make paper maps curl at the corners."
];

const advisories = [
  "Carry a light; the shadows are working overtime.",
  "Leave five extra minutes for wonder and wet stairs.",
  "Keep your coat close and your plans adjustable.",
  "Tonight favors patient travelers and quiet shoes.",
  "Windows should be latched before the second bell.",
  "Watch for slick stone where the lamps go thin.",
  "Tea is recommended; certainty is optional.",
  "If you hear distant chimes, take the longer road home.",
  "Umbrellas may invert, but spirits need not.",
  "Secure loose pages; the wind is collecting stories.",
  "Mariners should trust lanterns more than horizons.",
  "Expect delays near bridges and improbable birds.",
  "Best hour for departures: after the rain remembers your name.",
  "Report any sudden sunshine to the nearest attendant."
];

const linePlace = document.getElementById("line-place");
const lineSky = document.getElementById("line-sky");
const lineAir = document.getElementById("line-air");
const lineAdvisory = document.getElementById("line-advisory");
const forecastButton = document.getElementById("forecast-btn");
const copyButton = document.getElementById("copy-btn");
const copyLinkButton = document.getElementById("copy-link-btn");
const copyStatus = document.getElementById("copy-status");
const SEED_PARAM = "seed";
let currentSeed = "";

function fnv1a(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seedValue) {
  let state = seedValue >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pickBySeed(list, random) {
  return list[Math.floor(random() * list.length)];
}

function randomSeed() {
  if (window.crypto && typeof window.crypto.getRandomValues === "function") {
    const bytes = new Uint32Array(1);
    window.crypto.getRandomValues(bytes);
    return bytes[0].toString(36);
  }

  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
}

function setSeedInUrl(seed) {
  const url = new URL(window.location.href);
  url.searchParams.set(SEED_PARAM, seed);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function getSeedFromUrl() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(SEED_PARAM)) {
    return null;
  }

  return url.searchParams.get(SEED_PARAM);
}

function showStatus(message) {
  copyStatus.textContent = message;
}

function resetLineAnimation() {
  const lines = [linePlace, lineSky, lineAir, lineAdvisory];
  for (const line of lines) {
    line.style.animation = "none";
    void line.offsetWidth;
    line.style.animation = "";
  }
}

function buildForecast(seed) {
  const random = mulberry32(fnv1a(seed));
  const place = pickBySeed(places, random);
  const sky = pickBySeed(skies, random);
  const atmosphere = pickBySeed(air, random);
  const advisory = pickBySeed(advisories, random);

  linePlace.textContent = `Forecast for ${place}:`;
  lineSky.textContent = sky;
  lineAir.textContent = atmosphere;
  lineAdvisory.textContent = advisory;

  resetLineAnimation();
}

function renderForecastForSeed(seed) {
  currentSeed = seed;
  buildForecast(seed);
  setSeedInUrl(seed);
  showStatus("");
}

function getForecastText() {
  return [linePlace, lineSky, lineAir, lineAdvisory]
    .map((line) => line.textContent.trim())
    .join("\n");
}

async function copyForecast() {
  try {
    await navigator.clipboard.writeText(getForecastText());
    showStatus("Bulletin copied to clipboard.");
  } catch (error) {
    showStatus("Clipboard unavailable. Copy manually from the card.");
  }
}

function getSeededUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set(SEED_PARAM, currentSeed);
  return url.toString();
}

async function copySeededLink() {
  try {
    await navigator.clipboard.writeText(getSeededUrl());
    showStatus("Link copied to clipboard.");
  } catch (error) {
    showStatus("Clipboard unavailable. Copy link manually from the address bar.");
  }
}

forecastButton.addEventListener("click", () => {
  renderForecastForSeed(randomSeed());
});
copyButton.addEventListener("click", copyForecast);
copyLinkButton.addEventListener("click", copySeededLink);

const seedFromUrl = getSeedFromUrl();
const initialSeed = seedFromUrl === null ? randomSeed() : seedFromUrl;
renderForecastForSeed(initialSeed);
