'use strict';

const getElement = (id) => document.getElementById(id);

const createElement = (tag = 'div') => document.createElement(tag);

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

const resolvePath = (object, path) => {
  const steps = path.split('.');
  for (const step of steps) object = object[step];
  return object;
};

const updateValueByPath = (object, path, value) =>
  path.split('.').reduce((o, p, i) => (o[p] = path.split('.').length === ++i ? value : o[p] || {}), object);

window.getElement = getElement;
window.createElement = createElement;
window.createElements = createElements;
window.resolvePath = resolvePath;
window.updateValueByPath = updateValueByPath;
