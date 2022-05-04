'use strict';

const MIN_GAMES_AMOUNT = 1;
const MAX_GAMES_AMOUNT = 99;

const GAME_PATH = 'game.html';

const defaultSettings = {
  gamesAmount: 10,
  clefs: { g: true, f: false },
  accidentals: { natural: true, sharp: true, flat: false },
  onlyAudio: false,
};

const gamesAmountInput = window.getElement('gamesAmountInput');

const clefGCheckbox = window.getElement('clefG');
const clefFCheckbox = window.getElement('clefF');

const sharpCheckbox = window.getElement('sharp');
const flatCheckbox = window.getElement('flat');
const naturalCheckbox = window.getElement('natural');

const staffCheckbox = window.getElement('withStaff');
const audioCheckbox = window.getElement('audio');

const inputsToSettings = [
  {
    input: gamesAmountInput,
    valueName: 'value',
    path: 'gamesAmount',
    format: (val) => +val,
    validate(value) {
      const int = +value;
      const isValidNumber = !isNaN(int);
      const isInLimit = int <= MAX_GAMES_AMOUNT && int >= MIN_GAMES_AMOUNT;
      return isValidNumber && isInLimit;
    },
  },
  {
    input: clefGCheckbox,
    valueName: 'checked',
    path: 'clefs.g',
    validate: (value) => (!value ? clefFCheckbox.checked : true),
  },
  {
    input: clefFCheckbox,
    valueName: 'checked',
    path: 'clefs.f',
    validate: (value) => (!value ? clefGCheckbox.checked : true),
  },
  {
    input: sharpCheckbox,
    valueName: 'checked',
    path: 'accidentals.sharp',
    validate: (value) => (!value ? flatCheckbox.checked || naturalCheckbox.checked : true),
  },
  {
    input: flatCheckbox,
    valueName: 'checked',
    path: 'accidentals.flat',
    validate: (value) => (!value ? sharpCheckbox.checked || naturalCheckbox.checked : true),
  },
  {
    input: naturalCheckbox,
    valueName: 'checked',
    path: 'accidentals.natural',
    validate: (value) => (!value ? flatCheckbox.checked || sharpCheckbox.checked : true),
  },
  {
    input: staffCheckbox,
    valueName: 'checked',
    path: 'onlyAudio',
    format: (val) => !val,
  },
  { input: audioCheckbox, valueName: 'checked', path: 'onlyAudio' },
];

const inputChangeHandler = ({ srcElement }) => {
  try {
    const { id } = srcElement;
    const { gameSettings, resolvePath, updateValueByPath } = window;
    const relation = inputsToSettings.find((el) => el.input.id === id);
    if (!relation) throw new Error('Relation not found', srcElement);
    const { valueName, path, validate, format } = relation;
    let resolvedSettingsValue = resolvePath(gameSettings, path);
    const isValidData = validate ? validate(srcElement[valueName]) : true;
    if (!isValidData) {
      // Set old value
      srcElement[valueName] = resolvedSettingsValue;
      throw new Error('Data are not valid');
    }
    const formatted = format ? format(srcElement[valueName]) : srcElement[valueName];
    updateValueByPath(gameSettings, path, formatted);
    window.updateSettings();
  } catch (err) {
    console.error(err);
  }
};

const loadSettings = () => {
  const settings = window.getSettings();
  if (!settings) {
    const isUpdateOk = window.updateSettings(defaultSettings);
    if (!isUpdateOk) throw new Error('Update was not ok');
    return loadSettings();
  }
  window.gameSettings = settings;
  const { resolvePath, gameSettings } = window;
  for (const toChange of inputsToSettings) {
    const { input, valueName, path, format } = toChange;
    const resolvedData = resolvePath(gameSettings, path);
    const formatted = format ? format(resolvedData) : resolvedData;
    input[valueName] = formatted;
    input.addEventListener('change', inputChangeHandler);
  }
  return true;
};

/* Games amount */
const gamesAmountMinus = window.getElement('amountMinus');
const gamesAmountPlus = window.getElement('amountPlus');

const setGamesAmount = (amount = defaultSettings.gamesAmount) => {
  gamesAmountInput.value = amount;
  window.gameSettings.gamesAmount = amount;
  window.updateSettings();
};

const decrementGamesAmount = () => {
  const { gamesAmount } = window.gameSettings;
  if (gamesAmount <= MIN_GAMES_AMOUNT) return;
  setGamesAmount(gamesAmount - 1);
};

const incrementGamesAmount = () => {
  const { gamesAmount } = window.gameSettings;
  if (gamesAmount >= MAX_GAMES_AMOUNT) return;
  setGamesAmount(gamesAmount + 1);
};

gamesAmountMinus.addEventListener('click', decrementGamesAmount);
gamesAmountPlus.addEventListener('click', incrementGamesAmount);

/* Submit button */
const onSubmit = () => {
  try {
    // TODO: Maybe should make additional data validation
    window.updateState();
    window.location.assign(GAME_PATH);
  } catch (err) {
    console.error(err);
    // TODO: Make custom alerts
    alert(err.message ? err.message : err);
  }
};

const submitButton = window.getElement('submit');
submitButton.addEventListener('click', onSubmit);

loadSettings();
