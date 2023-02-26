function DELETE_TASK(state, task) {
  const findDeletedTask = state.tasks.map((el) => el).indexOf(task);
  state.tasks.splice(findDeletedTask, 1);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function SET_TASK(state, payload) {
  state.tasks = payload;
  localStorage.setItem("tasks", JSON.stringify(payload));
}

function DELETE_TASKS(state) {
  state.tasks.splice(0, state.tasks.length);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function RESOLVE_TASK(state, task) {
  const findResolvedTask = state.tasks.find((el) => el === task);
  findResolvedTask.resolved = !findResolvedTask.resolved;

  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function RESOLVE_TASKS(state) {
  state.tasks.forEach((task) => {
    task.resolved = !task.resolved;
    if (!task.resolved) {
      task.resolved = true;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function ADD_TASK(state, task) {
  state.tasks.unshift(task);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

export {
  DELETE_TASKS,
  RESOLVE_TASKS,
  RESOLVE_TASK,
  SET_TASK,
  ADD_TASK,
  DELETE_TASK,
};
