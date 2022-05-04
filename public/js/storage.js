'use strict';

/**
 * Gets JSON from local storage and parses it
 * @param {string!} key - Key
 * @param {boolean} [deleteOnError=true] - Whether to delete the current value of an element
 *    if an error occurred while parsing it
 * @returns {Object}
 */
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

/**
 * Set the new value of the item in local storage.
 * The data passes the stringify
 * @param {string!} key - Key
 * @param {Object} data - JSON data to store
 * @returns {boolean} - Whether or not it's successful
 */
const setLocalStorageItem = (key, data) => {
  try {
    const stringifiedData = JSON.stringify(data);
    window.localStorage.setItem(key, stringifiedData);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Alias for getLocalStorageItem('settings')
 * @returns {Settings}
 */
const getSettings = () => getLocalStorageItem('settings');
/**
 * Alias for setLocalStorageItem('settings', newData);
 * @param {Settings} [newData=window.gameSettings] - New settings object
 * @returns {boolean} - Whether or not it's successful
 */
const updateSettings = (newData = window.gameSettings) => setLocalStorageItem('settings', newData);

const getState = () => getLocalStorageItem('state');
const updateState = (newData = window.currentState) => setLocalStorageItem('state', newData);

window.getLocalStorageItem = getLocalStorageItem;
window.setLocalStorageItem = setLocalStorageItem;

window.getSettings = getSettings;
window.updateSettings = updateSettings;

window.getState = getState;
window.updateState = updateState;
