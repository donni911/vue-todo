<template>
  <section class="max-w-[400px] mx-auto my-14 px-6">
    <input-add
      v-model="todoValue"
      :inputError="inputError"
      @add-todo-item="addTodoItem"
    />
    <TodoList :items="items || []" />
  </section>
</template>

<script>
import InputAdd from "./components/UI/InputAdd.vue";
import TodoList from "./components/TodoList.vue";
import store from "./store";

export default {
  components: { TodoList, InputAdd },

  data() {
    return {
      show: false,
      todoValue: "",
      inputError: false,
    };
  },

  computed: {
    items() {
      return store.state.tasks;
    },

    formatTime() {
      return new Date().toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      });
    },
  },

  methods: {
    startTimer() {
      this.inputError = true;

      setTimeout(() => {
        if (this.inputError) {
          this.inputError = false;
        }
      }, 2000); // 2 seconds delay
    },

    addTodoItem() {
      if (!this.todoValue || this.todoValue.trim() === "") {
        this.todoValue = "";

        this.startTimer();

        return;
      }

      store.dispatch("addTask", {
        title: this.todoValue.trim(),
        recordingTime: this.formatTime,
        resolved: false,
      });

      this.todoValue = "";
    },
  },

  created() {
    store.dispatch("loadDataFromLocalStorage");
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
