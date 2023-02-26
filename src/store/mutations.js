function DELETE_TASK(state, task) {
  const findDeletedTask = state.tasks.map((el) => el).indexOf(task);
  state.tasks.splice(findDeletedTask, 1);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function SET_TASK(state, payload) {
  state.tasks = payload;
  localStorage.setItem("tasks", JSON.stringify(payload));
}

function ADD_TASK(state, task) {
  state.tasks.unshift(task);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

export { SET_TASK, ADD_TASK, DELETE_TASK };
