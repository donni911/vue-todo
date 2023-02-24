function setTasks(state, task) {
  const findDeletedTask = state.tasks.map((el) => el).indexOf(task);
  state.tasks.splice(findDeletedTask, state.tasks.length);
}

export { setTasks };
