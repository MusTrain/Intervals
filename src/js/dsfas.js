'use strict';

const getRandomNOte = ({ accidentals }) => {
  const filtredTones = tones.filter((t) =>
    t.filter((n) => {
      if (accidentals.flat && n.endsWith('b')) return true;
      else if (accidentals.sharp && n.endsWith('#')) return true;
      else if (accidentals.natural && n.length === 1) return true;
      else return false;
    }),
  );
  console.log(filtredTones);
};

const isEven = (n) => n % 2 === 0;
const random = (n) => Math.floor(Math.random() * n);
const randomElement = (arr) => arr[random(arr.length)];

// const getNote = (index, octave = 4) => {
//   if (index < 12) return `${randomElement(tones[index])}${octave}`;
//   else return getNote(index - 12, octave + 1);
// };
const randomNote = ({ accidentals }) => {
  getNote(random(notes.length - 1), octave);
};
const findNoteIndex = (note) => notes.findIndex((n) => n.some((e) => note.startsWith(e)));

const createInterval = (initialNumber = random(7)) => {
  const lessEqualThird = initialNumber < 4;
  const halfTones = initialNumber + (lessEqualThird ? 1 : 4);
  const exceptCase = initialNumber === 1 || initialNumber === 3;
  const interval = Math.floor(halfTones / 2) + (exceptCase ? 1 : 2);
  const name = `${isEven(initialNumber + 1) ? 'G' : 'k'}${interval}`;
  return { name, halfTones };
};

const generateTask = (settings) => {
  const interval = createInterval();
  return console.log(getNote(window.gameSettings));

  const startNote = randomNote(settings);
  const startNoteIndex = findNoteIndex(startNote);
  const nextNoteIndex = startNoteIndex + interval.halfTones;
  const nextOctave = nextNoteIndex < startNoteIndex ? 5 : 4;
  const nextNote = getNote(nextNoteIndex, nextOctave);
  return { interval, notes: [startNote, nextNote] };
};

window.generateTask = generateTask;
