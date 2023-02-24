<template>
  <section class="max-w-[400px] mx-auto mt-14 px-6">
    <TodoList :items="items || []" />
  </section>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import store from "./store";
export default {
  components: { TodoList },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    items() {
      return store.state.tasks;
    },
  },
};
</script>
