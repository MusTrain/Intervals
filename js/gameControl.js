const updateResult = () => {
  const { intervalSize, interval } = window;
  const resultSpan = document.getElementById("result");
  resultSpan.innerHTML = `${intervalSize ? intervalSize : ""}${
    interval ? interval : ""
  }`;
};

const selectSize = (size) => {
  window.intervalSize = size;
  updateResult();
};

const selectInterval = (interval) => {
  window.interval = interval;
  updateResult();
};

const answer = () => {
  const { interval, intervalSize, currentTask } = window;
  if (!interval || !intervalSize) return alert("Die Antwort ist nicht ganz");
  const intervalName = `${intervalSize}${interval}`;
  const isCorrect = intervalName === currentTask.interval.name;
  if (isCorrect) alert("Richtig!");
  else {
    alert(
      `Falsch! Antwort: ${currentTask.interval.name} | ${currentTask.notes.join(
        " - "
      )}`
    );
  }

  window.interval = "";
  window.intervalSize = "";
  updateResult();

  window.nextTask();
};

window.selectSize = selectSize;
window.selectInterval = selectInterval;
window.answer = answer;
