const places = [
  { name: "Gullwhisper Spit", tags: ["coastal", "harbor"] },
  { name: "The Ninth Lantern Archipelago", tags: ["coastal", "ceremonial"] },
  { name: "Cinderwell Station", tags: ["industrial", "inland"] },
  { name: "Mothglass Harbor", tags: ["harbor", "ceremonial"] },
  { name: "Salt Cathedral", tags: ["coastal", "ceremonial"] },
  { name: "Old Meridian Hollow", tags: ["inland", "highland"] },
  { name: "The Ink Plains", tags: ["inland", "open"] },
  { name: "Bracken Moon Ferry", tags: ["river", "harbor"] },
  { name: "Rook & Tide", tags: ["coastal", "industrial"] },
  { name: "Velvet Quarry", tags: ["industrial", "highland"] },
  { name: "Nocturne Crossing", tags: ["inland", "ceremonial"] },
  { name: "Pale Engine Bay", tags: ["industrial", "harbor"] },
  { name: "Fogkeeper's Reach", tags: ["coastal", "highland"] },
  { name: "Hearthless Peninsula", tags: ["coastal", "inland"] }
];

const skies = [
  { text: "A low ceiling of moonlit ash drifts over the district.", tags: ["industrial", "inland"] },
  { text: "Thin rain threads the dark like loose silver wire.", tags: ["coastal", "harbor"] },
  { text: "Cloudbanks glow faintly, as if lit from underwater.", tags: ["coastal", "ceremonial"] },
  { text: "The stars have gone behind bruised slate and will not answer.", tags: ["highland", "inland"] },
  { text: "A clear interval opens briefly, then folds shut again.", tags: ["inland", "open"] },
  { text: "Pearl-gray mist climbs the rooftops before dawn can object.", tags: ["harbor", "inland"] },
  { text: "Lantern-colored clouds linger at the edge of the bay.", tags: ["harbor", "ceremonial"] },
  { text: "A patient overcast settles in and refuses departure.", tags: ["inland", "industrial"] },
  { text: "Cold light leaks through fractured cloud in narrow bands.", tags: ["highland", "inland"] },
  { text: "The horizon burns amber, then dims to ink.", tags: ["open", "inland"] },
  { text: "Storm glass tones gather without thunder yet.", tags: ["coastal", "industrial"] },
  { text: "High cirrus trails resemble handwriting nobody can read.", tags: ["highland", "ceremonial"] },
  { text: "Snowlight hangs in the air though no flakes commit.", tags: ["highland", "inland"] },
  { text: "Night fog beads on windows like unfinished constellations.", tags: ["harbor", "coastal"] }
];

const air = [
  { text: "Wind moves east at a librarian's pace, turning signs one syllable at a time.", tags: ["inland", "ceremonial"] },
  { text: "Harbor gusts arrive in polite bursts, then retreat to listen.", tags: ["harbor", "coastal"] },
  { text: "The air carries iron, wet cedar, and a rumor of lightning.", tags: ["industrial", "highland"] },
  { text: "Pressure falls gently; doors may speak in their hinges.", tags: ["inland", "ceremonial"] },
  { text: "A river-cold draft crosses the streets and edits every conversation.", tags: ["river", "inland"] },
  { text: "Warmth rises from cobblestone vents, meeting the chill halfway.", tags: ["industrial", "inland"] },
  { text: "Northern currents comb the cranes and leave a violin hum.", tags: ["industrial", "harbor"] },
  { text: "Static gathers in coat sleeves and in unspoken decisions.", tags: ["highland", "industrial"] },
  { text: "Sea breath rolls inland, salt-rich and deliberate.", tags: ["coastal", "harbor"] },
  { text: "The atmosphere is still enough to hear clock towers blink.", tags: ["ceremonial", "inland"] },
  { text: "Crosswinds braid over the bridge with careful hands.", tags: ["river", "harbor"] },
  { text: "Anise-sweet haze lingers low, softening distant engines.", tags: ["industrial", "coastal"] },
  { text: "The barometer steadies, but the alleys keep their weather.", tags: ["inland", "industrial"] },
  { text: "Dry currents from the interior make paper maps curl at the corners.", tags: ["inland", "open"] }
];

const advisories = [
  { text: "Carry a light; the shadows are working overtime.", tags: ["inland", "highland"], tone: "cautionary" },
  { text: "Leave five extra minutes for wonder and wet stairs.", tags: ["harbor", "coastal"], tone: "ordinary" },
  { text: "Keep your coat close and your plans adjustable.", tags: ["inland", "open"], tone: "ordinary" },
  { text: "Tonight favors patient travelers and quiet shoes.", tags: ["ceremonial", "inland"], tone: "ordinary" },
  { text: "Windows should be latched before the second bell.", tags: ["ceremonial", "industrial"], tone: "cautionary" },
  { text: "Watch for slick stone where the lamps go thin.", tags: ["highland", "inland"], tone: "cautionary" },
  { text: "Tea is recommended; certainty is optional.", tags: ["ceremonial", "inland"], tone: "ordinary" },
  { text: "If you hear distant chimes, take the longer road home.", tags: ["highland", "ceremonial"], tone: "uncanny" },
  { text: "Umbrellas may invert, but spirits need not.", tags: ["coastal", "harbor"], tone: "ordinary" },
  { text: "Secure loose pages; the wind is collecting stories.", tags: ["open", "inland"], tone: "cautionary" },
  { text: "Mariners should trust lanterns more than horizons.", tags: ["harbor", "coastal"], tone: "cautionary" },
  { text: "Expect delays near bridges and improbable birds.", tags: ["river", "harbor"], tone: "cautionary" },
  { text: "Best hour for departures: after the rain remembers your name.", tags: ["coastal", "inland"], tone: "uncanny" },
  { text: "Report any sudden sunshine to the nearest attendant.", tags: ["industrial", "ceremonial"], tone: "uncanny" }
];

const toneInterpretations = {
  ordinary: "Flavor only; no mechanical effect.",
  cautionary: "Mild penalty or short delay.",
  uncanny: "Rare event or unusual opportunity."
};

const linePlace = document.getElementById("line-place");
const lineSky = document.getElementById("line-sky");
const lineAir = document.getElementById("line-air");
const lineAdvisory = document.getElementById("line-advisory");
const oracleNote = document.getElementById("oracle-note");
const forecastButton = document.getElementById("forecast-btn");
const copyButton = document.getElementById("copy-btn");
const copyLinkButton = document.getElementById("copy-link-btn");
const copyStatus = document.getElementById("copy-status");
const SEED_PARAM = "seed";
let currentSeed = "";
let currentOracleSentence = "";

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

function countTagOverlap(a, b) {
  let overlap = 0;
  for (const tag of a) {
    if (b.includes(tag)) {
      overlap += 1;
    }
  }
  return overlap;
}

function pickWeightedBySeed(list, weights, random) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = random() * totalWeight;

  for (let i = 0; i < list.length; i += 1) {
    cursor -= weights[i];
    if (cursor <= 0) {
      return list[i];
    }
  }

  return list[list.length - 1];
}

function pickForPlace(options, placeTags, random) {
  const surpriseChance = 0.18;
  if (random() < surpriseChance) {
    return pickBySeed(options, random);
  }

  const weights = options.map((option) => 1 + countTagOverlap(option.tags, placeTags) * 3);
  return pickWeightedBySeed(options, weights, random);
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

function toTitleCase(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function buildForecast(seed) {
  const random = mulberry32(fnv1a(seed));
  const place = pickBySeed(places, random);
  const sky = pickForPlace(skies, place.tags, random);
  const atmosphere = pickForPlace(air, place.tags, random);
  const advisory = pickForPlace(advisories, place.tags, random);
  const toneLabel = toTitleCase(advisory.tone);
  const toneInterpretation = toneInterpretations[advisory.tone];

  linePlace.textContent = `Forecast for ${place.name}:`;
  lineSky.textContent = sky.text;
  lineAir.textContent = atmosphere.text;
  lineAdvisory.textContent = advisory.text;
  currentOracleSentence = `${toneLabel} omen \u2014 ${toneInterpretation}`;
  oracleNote.textContent = currentOracleSentence;

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
    .join("\n")
    .concat(`\n\nOracle reading: ${currentOracleSentence}`);
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
