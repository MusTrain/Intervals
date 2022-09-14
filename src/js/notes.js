'use strict';

const NOTES_PX_OFFSET = 10;
const mainNotes = { g: ['e', 5], f: ['g', 3] };

const naturalNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'h'];

const getMargin = (note, clef) => {
  const [naturalNote, octave] = [note[0].toLowerCase(), +note[note.length - 1]];
  const naturalNoteIndex = naturalNotes.findIndex((n) => n === naturalNote);
  const [mainNote, mainOctave] = mainNotes[clef];
  const mainNoteIndex = naturalNotes.findIndex((n) => n === mainNote);
  if (mainOctave === octave) {
    const result = (mainNoteIndex - naturalNoteIndex) * NOTES_PX_OFFSET;
    return result === 0 ? 1 : result;
  }
  const octaveAmount = Math.abs(mainOctave - octave);
  const notesAmount = octaveAmount * naturalNotes.length;
  return (notesAmount - naturalNoteIndex + mainNoteIndex) * NOTES_PX_OFFSET;
};

const createStave = (containerId, { clef, notes }) => {
<<<<<<< Updated upstream:src/js/notes.js
=======
  // Check the container
  let isOk = true;
>>>>>>> Stashed changes:public/js/notes.js
  const container = window.getElement(containerId);
  if (!container) throw new Error('Element not found');
  const elementsToCreate = [
    { name: 'stave', classes: ['stave'] },
    { name: 'clefElement', classes: ['clef', clef], parent: 'stave' },
    { name: 'notesContainer', classes: ['notes'], parent: 'stave' },
  ];
  for (const [i, note] of Object.entries(notes)) {
    const margin = getMargin(note, clef);
    console.log('MARGIN', margin);
    isOk = margin > -40;
    elementsToCreate.push({
      name: `note${i}`,
      classes: ['note'],
      attributes: { 'data-content': note.toLowerCase(), style: `top: ${margin}px` },
      parent: 'notesContainer',
    });
  }
  const { stave } = window.createElements(elementsToCreate);
  container.replaceChildren(stave);
  if (!isOk) debugger;
};

window.createStave = createStave;
