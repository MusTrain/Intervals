const { Factory } = window.Vex.Flow;

const drawNotes = (initialNotes) => {
  const vf = new Factory({
    renderer: { elementId: "notes" }
  });
  const score = vf.EasyScore();
  const system = vf.System();

  system
    .addStave({
      voices: initialNotes.map((note) => score.voice(score.notes(`${note}/w`)))
    })
    .addClef("treble")
    .setWidth(500);
  vf.draw();
};

const clearContainer = () => {
  const container = document.getElementById("notes");
  container.replaceChildren();
};

const nextTask = () => {
  clearContainer();
  const task = window.createTask();
  console.log(task);
  drawNotes(task.notes.map((n) => `${n}/w`));
  window.currentTask = task;
};
nextTask();

window.nextTask = nextTask;
