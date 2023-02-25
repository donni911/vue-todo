function DELETE_TASK(state, task) {
  const findDeletedTask = state.tasks.map((el) => el).indexOf(task);
  state.tasks.splice(findDeletedTask, 1);
}

function ADD_TASK(state, task) {
  state.tasks.unshift(task);
}

export { ADD_TASK, DELETE_TASK };
