'use strict';

const octaves = { g: [4, 5], f: [2, 3] };
const allTones = [
  ['C', 'H#'],
  ['C#', 'Db'],
  ['D'],
  ['D#', 'Eb'],
  ['E', 'Fb'],
  ['F', 'E#'],
  ['Gb', 'F#'],
  ['G'],
  ['G#', 'Ab'],
  ['A'],
  ['A#', 'Hb'],
  ['H'],
];

/**
 * The relation between the name of the minor interval and the number of semitones
 * 2 - second, 3 - third, 6 - sixth, 7 - seventh
 * @typedef {Object.<number, number>} Intervals
 */
const intervalHalfTones = { 2: 1, 3: 3, 6: 8, 7: 10 };

/**
 * Returns random number in given range from 0
 * @param {number} n - Range of numbers from 0 to N
 * @returns {number} - Random number
 */
const random = (n) => Math.floor(Math.random() * n);

/**
 * Return random element in array
 * @param {Array} arr - Some array
 * @returns {any} - Any random element in array
 */
const randomElement = (arr) => arr[random(arr.length)];

// Check if this note fits the user settings
const isNoteFitSettings = (note, accidentals) => {
  const isFlat = note.endsWith('b') && accidentals.flat;
  const isSharp = note.endsWith('#') && accidentals.sharp;
  const isNatural = note.length === 1 && accidentals.natural;
  return isFlat || isSharp || isNatural;
};

/**
 * Filters tones based on user settings (accidentals)
 * @param {Settings} settings -  User game settings
 * @param {Array<Array<string>>} array - Array of tones
 * @returns {Array} - Array of tones that fit in user settings
 */
const filterTones = ({ accidentals }, array = allTones) =>
  // Flat all elements. All that matters to us is filtration, not order.
  // The element index can be found later, because all tones are unique
  array.flatMap((tone) => tone.filter((note) => isNoteFitSettings(note, accidentals)));

/**
 * Returns random note that fits user accidentals settings
 * @param {Settings} settings - User game settings
 * @returns {string} - Random note
 */
const getRandomNote = (settings) => {
  const filtredTones = filterTones(settings);
  return randomElement(filtredTones);
};

const countHalfTones = (size, duration) => {
  // If size is Major, add 1 halftone
  const isMajor = size === 'M';
  const halfTones = intervalHalfTones[+duration] + (isMajor ? 1 : 0);
  return halfTones;
};

const createInterval = () => {
  // M - major, m - minor
  const size = randomElement(['m', 'M']);
  const duration = randomElement([2, 3, 6, 7]);
  const halfTones = countHalfTones(size, duration);
  return { size, duration, halfTones };
};

const getToneIndex = (tone) => allTones.findIndex((t) => t.includes(tone));

const getTonesIndices = (tones) => tones.map(getToneIndex);

const buildInterval = (toneA, interval, settings) => {
  const toneAIndex = getToneIndex(toneA);
  // Due to the fact that the interval can reach another octave,
  // the received tone index can go out of bounds.
  // Therefore, it is necessary to obtain a natural index
  const sumOfTones = toneAIndex + interval.halfTones;
  const toneBIndex = sumOfTones >= allTones.length ? sumOfTones - allTones.length : sumOfTones;
  // Get tone and check, whether the interval fits settings
  const notesFitSettings = filterTones(settings, [allTones[toneBIndex]]);
  if (notesFitSettings.length === 0) return null;
  // Return toneB
  return notesFitSettings[0];
};

const determineOctaves = (clef, toneA, toneB) => {
  const [toneAIndex, toneBIndex] = getTonesIndices([toneA, toneB]);
  const clefOctaves = octaves[clef];
  // If second tone is higher than first one, they must be in the same octave
  if (toneAIndex < toneBIndex) clefOctaves[1] = clefOctaves[0];
  return clefOctaves;
};

const buildNotes = (tones, noteOctaves) => tones.map((t, i) => `${t}${noteOctaves[i]}`);

const randomClef = (settings) => randomElement(Object.keys(octaves).filter((clef) => settings.clefs[clef]));

const generateTask = (settings) => {
  try {
    // Generate random interval and build it with random notes
    const interval = createInterval();
    const toneA = getRandomNote(settings);
    const toneB = buildInterval(toneA, interval, settings);
    // If toneB does not fit the settings, must regenerate task
    if (!toneB) return generateTask(settings);
    const clef = randomClef(settings);
    const noteOctaves = determineOctaves(clef, toneA, toneB);
    const notes = buildNotes([toneA, toneB], noteOctaves);
    return { interval, notes, clef };
  } catch (err) {
    console.error(err);
    return generateTask(settings);
  }
};

window.getRandomNote = getRandomNote;
window.countHalfTones = countHalfTones;
window.createInterval = createInterval;
window.generateTask = generateTask;
