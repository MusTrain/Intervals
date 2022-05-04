'use strict';

// TODO: Remove next line, when using will be added
// eslint-disable-next-line no-unused-vars
let currentAnswer = null;

// TODO: Generate task
const generateTask = () => ({ task: ['C', 'D'], answer: '02' });

const nextTask = (settings = {}, state = {}) => {
  const { task, answer } = generateTask(settings);
  state.task = task;
  state.taskCount += 1;
  state.currentAnswer = null;
  currentAnswer = answer;
  window.updateState(state);
};

const createNewGame = (settings) => {
  const newState = {
    task: null,
    taskCount: 0,
    correct: 0,
    currentAnswer: '',
  };
  window.updateState(newState);
  nextTask(settings, newState);
};

const parseState = () => {
  // TODO
};

const main = () => {
  try {
    const settings = window.getSettings();
    window.gameSettings = settings;
    if (!settings) throw new Error('Settings were not found');
    const currentState = window.getState();
    window.currentState = currentState;
    if (!currentState) return createNewGame(settings);
    else parseState(currentState);
  } catch (err) {
    console.error(err);
    alert(err.message ? err.message : err);
    window.location.assign('/settings.html');
  }
  return true;
};

main();
