<template>
  <section class="h-full w-full max-w-[900px] mx-auto">
    <div class="p-6 shadow-md shadow-primary rounded">
      <input
        name="search"
        type="text"
        class="rounded border-2 border-gray-200 w-full peer h-16 focus:ring-primary focus:border-primary dark:bg-slate-200"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <TodoList :items="items || []" />
    </div>
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
          title: "Wash a car",
          recordingTime: new Date(),
          resolved: true,
        },
        {
          title: "Buy products",
          recordingTime: new Date(),
          resolved: false,
        },
        {
          title: "Meet  with friend",
          recordingTime: new Date(),
          resolved: false,
        },
        {
          title: "Code a pet-project",
          recordingTime: new Date(),
          resolved: false,
        },
      ],
    };
  },

  mounted() {
    setTimeout(() => (this.$data.show = true), 3000);
  },
};
</script>
