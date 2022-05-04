'use strict';

const NOTES_PX_OFFSET = 10;
const mainNotes = { g: ['e', 5], f: ['g', 3] };
const naturalNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'h'];

/**
 * @typedef {('f'|'g')} Clef
 */

/**
 * Get margin for note (px)
 * @param {string!} note - Note (eg. C#4, Eb5, A2)
 * @param {Clef} clef - Clef
 * @returns {number} - Amount of px for element to be omit
 */
const getMargin = (note, clef) => {
  // Parse given note. Get natural and ocatve
  const [naturalNote, octave] = [note[0].toLowerCase(), +note[note.length - 1]];
  const naturalNoteIndex = naturalNotes.findIndex((n) => n === naturalNote);
  // The main note is the one between the first and second line (top: 0px)
  // Parse its natural value and octave
  const [mainNote, mainOctave] = mainNotes[clef];
  const mainNoteIndex = naturalNotes.findIndex((n) => n === mainNote);
  // If the note is in the same octave as the main note,
  // return the index difference
  if (mainOctave === octave) {
    const result = (mainNoteIndex - naturalNoteIndex) * NOTES_PX_OFFSET;
    // If the note equals the main note and the result is 0, then return 1.
    // This is because the distance between the lines is 19px
    // and there is a 1px hole, when we use top: 0px;
    return result === 0 ? 1 : result;
  }
  // Count the number of notes that are between the note and the main one
  const octaveAmount = Math.abs(mainOctave - octave);
  const notesAmount = octaveAmount * naturalNotes.length;
  return (notesAmount - naturalNoteIndex + mainNoteIndex) * NOTES_PX_OFFSET;
};

/**
 * Creates an element with stave, specified clef and notes
 * @param {string!} containerId - Id of an element, to append stave in
 * @param {Object} task - Task object
 * @param {Clef} task.clef - Clef
 * @param {string[]} task.notes - Notes
 */
const createStave = (containerId, { clef, notes }) => {
  // Check the container
  const container = window.getElement(containerId);
  if (!container) throw new Error('Element not found');
  // Create array of custom elements for quick creation
  const elementsToCreate = [
    { name: 'stave', classes: ['stave'] },
    { name: 'clefElement', classes: ['clef', clef], parent: 'stave' },
    { name: 'notesContainer', classes: ['notes'], parent: 'stave' },
  ];
  // Add every note to stave
  for (const [i, note] of Object.entries(notes)) {
    const margin = getMargin(note, clef);
    elementsToCreate.push({
      name: `note${i}`,
      classes: ['note'],
      attributes: { 'data-content': note, style: `top: ${margin}px` },
      parent: 'notesContainer',
    });
  }
  // Append stave into container
  const { stave } = window.createElements(elementsToCreate);
  container.appendChild(stave);
};

createStave('notes', { clef: 'g', notes: ['g4', 'c5'] });

window.createStave = createStave;
