'use strict';

const NOTES_PX_OFFSET = 10;
const startNotes = { f: 19, g: 31 };
const clefRanges = { f: [8, 22], g: [19, 36] };
const naturalNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'h'];

const parseNote = (note) => {
  const natural = note[0];
  const octave = +note[note.length - 1];
  const hasAccidentals = note.length > 2;
  const hasSharp = hasAccidentals && note.includes('#');
  const hasFlat = hasAccidentals && note.includes('b');
  return { natural, octave, hasSharp, hasFlat };
};

const getAbsoluteIndex = (note) => {
  const naturalNote = note[0].toLowerCase();
  const octave = +note[note.length - 1];
  const noteIndex = naturalNotes.findIndex((n) => n === naturalNote);
  const absoluteIndex = noteIndex + 1 + (octave - 1) * naturalNotes.length;
  return absoluteIndex;
};

const getMargin = (note, clef) => {
  const absoluteIndex = getAbsoluteIndex(note);
  const startNoteIndex = startNotes[clef];
  return (startNoteIndex - absoluteIndex) * NOTES_PX_OFFSET;
};

const noteToElement = (name, note, clef) => {
  const margin = getMargin(note, clef);
  const { natural, octave, hasSharp, hasFlat } = parseNote(note);
  const attributes = { 'data-content': `${natural}${octave}`, style: `top: ${margin}px` };
  const result = { name, classes: ['note'], attributes };
  if (hasSharp) result.classes.push('sharp');
  else if (hasFlat) result.classes.push('flat');
  return result;
};

class StaveBuilder {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = window.getElement(containerId);
    this.clef = null;
    this.notes = [];
    this.init();
  }

  init() {
    if (!this.container) throw new Error('Element not found');
    const elementsToCreate = [
      { name: 'stave', classes: ['stave'] },
      { name: 'clefElement', classes: ['clef'], parent: 'stave' },
      { name: 'notesContainer', classes: ['notes'], parent: 'stave' },
    ];
    const elements = window.createElements(elementsToCreate);
    this.container.replaceChildren(elements.stave);
    this.elements = elements;
  }

  setClef(newClef) {
    this.clef = newClef;
    const { clefElement } = this.elements;
    const allClefs = Object.keys(clefRanges);
    for (const clef of allClefs) clefElement.classList.remove(clef);
    clefElement.classList.add(newClef);
    return this;
  }

  setNotes(newNotes) {
    if (!this.clef) throw new Error('Clef should be defined');
    this.notes = newNotes;
    const elementsToCreate = [];
    for (const [i, note] of Object.entries(newNotes)) {
      const noteElement = noteToElement(`note${i}`, note, this.clef);
      elementsToCreate.push(noteElement);
    }
    const notes = Object.values(window.createElements(elementsToCreate));
    this.elements.notesContainer.replaceChildren(...notes);
    return this;
  }
}

window.StaveBuilder = StaveBuilder;
