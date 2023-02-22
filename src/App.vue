<template>
  <section class="max-w-[400px] mx-auto mt-14 px-6">
    <TodoList :items="items || []" />
  </section>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  components: { TodoList },

  data() {
    return {
      show: false,
      items: [
        {
          title: "Wash a car ",
          recordingTime: new Date(),
          resolved: true,
        },
        {
          title: "Buy products",
          recordingTime: new Date(),
          resolved: false,
        },
        // {
        //   title: "Meet  with friend",
        //   recordingTime: new Date(),
        //   resolved: false,
        // },
        // {
        //   title: "Code a pet-project",
        //   recordingTime: new Date(),
        //   resolved: false,
        // },
      ],
    };
  },

  mounted() {
    setTimeout(() => (this.$data.show = true), 3000);
  },
};
</script>
