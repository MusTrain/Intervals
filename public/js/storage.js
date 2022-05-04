'use strict';

const getLocalStorageItem = (key, deleteOnError = true) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error(err);
    if (deleteOnError) window.localStorage.removeItem(key);
    return null;
  }
};

const setLocalStorageItem = (key, data) => {
  try {
    const stringifiedData = JSON.stringify(data);
    window.localStorage.setItem(key, stringifiedData);
    return true;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getSettings = () => getLocalStorageItem('settings');
const updateSettings = (newData = window.gameSettings) => setLocalStorageItem('settings', newData);

const getState = () => getLocalStorageItem('state');
const updateState = (newData = window.currentState) => setLocalStorageItem('state', newData);

window.getLocalStorageItem = getLocalStorageItem;
window.setLocalStorageItem = setLocalStorageItem;

window.getSettings = getSettings;
window.updateSettings = updateSettings;

window.getState = getState;
window.updateState = updateState;
