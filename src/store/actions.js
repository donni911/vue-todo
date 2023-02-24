export function deleteTask({  commit }, task) {
  commit("setTasks", task);
}
