export function deleteTask({ commit }, task) {
  commit("DELETE_TASK", task);
}

export function addTask({ commit }, task) {
  commit("ADD_TASK", task);
}
