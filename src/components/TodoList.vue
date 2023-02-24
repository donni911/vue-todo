<template>
  <div class="mx-auto shadow-2xl shadow-primary-semi rounded-xl">
    <div
      class="p-6 bg-gradient-to-r from-primary-semi to-primary text-white rounded-t-xl"
    >
      {{ formatData }}
    </div>
    <ul>
      <TodoItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :is-open="item === activeTodo"
        @opened-action="openedAction"
        @close="closeActiveTodo"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  components: {
    TodoItem,
  },

  data() {
    return {
      activeTodo: null,
      active: null,
    };
  },

  methods: {
    openedAction(item) {
      if (this.activeTodo === item) {
        this.activeTodo = null;
      } else {
        this.activeTodo = item;
      }
    },

    closeActiveTodo() {
      this.activeTodo = null;
    },
  },

  computed: {
    formatData() {
      let formatting = {
        day: new Date().toLocaleString("en-GB", {
          day: "numeric",
        }),
        month: new Date().toLocaleString("en-GB", {
          month: "long",
        }),
        weekday: new Date().toLocaleString("en-GB", {
          weekday: "long",
        }),
      };
      return (
        formatting.day + " " + formatting.month + ", " + formatting.weekday
      );
    },
  },
};
</script>
