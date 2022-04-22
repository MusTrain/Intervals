const getElement = (id) => document.getElementById(id);

const resolvePath = (object, path) => {
  let current = object;
  const steps = path.split(".");
  for (const step of steps) current = current[step];
  return current;
};

const updateValueByPath = (object, path, value) =>
  path
    .split(".")
    .reduce(
      (o, p, i) => (o[p] = path.split(".").length === ++i ? value : o[p] || {}),
      object
    );

window.getElement = getElement;
window.resolvePath = resolvePath;
window.updateValueByPath = updateValueByPath;
