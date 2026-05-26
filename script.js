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
const copyStatus = document.getElementById("copy-status");

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function resetLineAnimation() {
  const lines = [linePlace, lineSky, lineAir, lineAdvisory];
  for (const line of lines) {
    line.style.animation = "none";
    void line.offsetWidth;
    line.style.animation = "";
  }
}

function buildForecast() {
  const place = randomItem(places);
  const sky = randomItem(skies);
  const atmosphere = randomItem(air);
  const advisory = randomItem(advisories);

  linePlace.textContent = `Forecast for ${place}:`;
  lineSky.textContent = sky;
  lineAir.textContent = atmosphere;
  lineAdvisory.textContent = advisory;

  resetLineAnimation();
  copyStatus.textContent = "";
}

function getForecastText() {
  return [linePlace, lineSky, lineAir, lineAdvisory]
    .map((line) => line.textContent.trim())
    .join("\n");
}

async function copyForecast() {
  try {
    await navigator.clipboard.writeText(getForecastText());
    copyStatus.textContent = "Bulletin copied to clipboard.";
  } catch (error) {
    copyStatus.textContent = "Clipboard unavailable. Copy manually from the card.";
  }
}

forecastButton.addEventListener("click", buildForecast);
copyButton.addEventListener("click", copyForecast);

buildForecast();
