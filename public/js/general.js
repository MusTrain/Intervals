'use strict';

/**
 * Alias for document.getElementById
 * @param {!string} id - Element's id
 * @returns {Element}
 */
const getElement = (id) => document.getElementById(id);

/**
 * Alias for document.createElement
 * @param {string} [tag=div] - HTML tag
 * @returns {Element}
 */
const createElement = (tag = 'div') => document.createElement(tag);

/**
 * An object that describes the basic properties
 * of an HTML element to be created
 * @typedef {Object} CustomElement
 * @property {!string} tag - HTML-tag
 * @property {!string} name - Element's identification string
 * @property {string[]} [classes] - List of classes to add
 * @property {Object.<string, string>[]} [attributes] - List of atttributes to add
 * @property {string} [parent] - The parent of the object to which the item will be added.
 *    name of the element, which is in the array before
 */

/**
 * Quick creation of HTML elements
 * @param {CustomElement[]} data - Elements to create
 * @returns {Object.<string, Element>}
 */
const createElements = (data) => {
  const resultElements = {};
  for (const { tag, classes, attributes, name, parent } of data) {
    const element = window.createElement(tag);
    element.classList.add(...classes);
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    }
    const parentElement = resultElements[parent];
    if (parentElement) parentElement.appendChild(element);
    resultElements[name] = element;
  }
  return resultElements;
};

/**
 * Finds data by the path (eg. "path.to.string")
 * @param {Object} object - Object, to search in
 * @param {string} path - Path (eg. "path.to.string")
 * @returns {any} - Data that are by the path stored
 */
const resolvePath = (object, path) => {
  const steps = path.split('.');
  for (const step of steps) object = object[step];
  return object;
};

/**
 * Updates value in object by the path (eg. "path.to.string")
 * @param {Object} object - Object, to search in
 * @param {string} path - Path (eg. "path.to.string")
 * @param {any} value - New value
 * @returns {undefined}
 */
const updateValueByPath = (object, path, value) =>
  path.split('.').reduce((o, p, i) => (o[p] = path.split('.').length === ++i ? value : o[p] || {}), object);

window.getElement = getElement;
window.createElement = createElement;
window.createElements = createElements;
window.resolvePath = resolvePath;
window.updateValueByPath = updateValueByPath;
