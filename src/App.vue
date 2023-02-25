<template>
  <section class="max-w-[400px] mx-auto mt-14 px-6">
    <div class="relative mb-4">
      <input
        class="w-full h-42 p-4 pr-14 rounded-xl"
        type="text"
        v-model="todoValue"
        placeholder="Add todo task..."
      />
      <transition>
        <button
          v-show="todoValue"
          @click="addTodoItem"
          @keydown.="addTodoItem"
          type="button"
          class="c-btn p-2 absolute right-4 top-[50%] translate-y-[-50%]"
        >
          <icon :name="'basic-tick'"></icon>
        </button>
      </transition>
    </div>
    <TodoList :items="items || []" />
  </section>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import store from "./store";
import icon from "./components/UI/Icon.vue";

export default {
  components: { TodoList, icon },

  data() {
    return {
      show: false,
      todoValue: "",
    };
  },

  computed: {
    items() {
      return store.state.tasks;
    },
  },
  methods: {
    addTodoItem() {
      if (!this.todoValue || this.todoValue.trim() == "") {
        this.todoValue = "";

        return;
      }

      store.dispatch("addTask", {
        title: this.todoValue.trim(),
        recordingTime: new Date(),
        resolved: false,
      });

      this.todoValue = "";
    },
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
