'use strict';

// TODO: Remove next line, when using will be added
// eslint-disable-next-line no-unused-vars
let currentAnswer = null;

const BLANK_STATE = {
  task: null,
  taskCount: 0,
  correct: 0,
  currentAnswer: '',
};

const createTask = (settings = window.settings, state = {}) => {
  const { interval, notes, clef } = window.generateTask(settings);
  console.log(notes);
  state.task = { notes, clef };
  state.taskCount += 1;
  state.currentAnswer = null;
  currentAnswer = interval;
  return { interval, notes, clef };
};

const parseState = () => {
  // TODO
};

const main = () => {
  try {
    // Load game settings
    const settings = window.getSettings();
    window.gameSettings = settings;
    if (!settings) throw new Error('Settings were not found');

    // Find state from the last game
    const currentState = window.getState();
    window.currentState = currentState;

    // TODO: Handle situation with parsing state
    const gameState = { ...BLANK_STATE };
    // TODO: Made class for state operations
    window.updateState(gameState);

    const Stave = new window.StaveBuilder('notes');
    const { clef, notes } = createTask(settings, gameState);
    Stave.setClef(clef).setNotes(notes);
  } catch (err) {
    console.error(err);
    alert(err.message ? err.message : err);
    // window.location.assign('/settings.html');
  }
  return true;
};

main();
