export function deleteTask({ commit }, task) {
  commit("DELETE_TASK", task);
}

export function addTask({ commit }, task) {
  commit("ADD_TASK", task);
}

export function loadDataFromLocalStorage({ commit }) {
  let data;

  if (localStorage.length === 0) {
    data = [];
  } else {
    data = JSON.parse(localStorage.getItem("tasks"));
  }
  
  commit("SET_TASK", data);
}
