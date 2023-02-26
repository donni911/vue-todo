<template>
  <div class="mx-auto shadow-2xl shadow-primary-semi rounded-xl">
    <div
      class="p-6 bg-gradient-to-r from-primary-semi to-primary text-white rounded-t-xl"
    >
      {{ formatData }}
    </div>
    <TransitionGroup class="relative" name="list" tag="ul">
      <TodoItem
        v-for="item in items"
        :key="item"
        :item="item"
        :is-open="item === activeTodo"
        @opened-action="openedAction"
        @close="closeActiveTodo"
      />
      <li
        v-if="!items.length"
        class="p-6 flex items-center justify-between bg-white last:rounded-b-xl transition-all"
      >
        What you want to do today?
      </li>
    </TransitionGroup>
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

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  min-height: 100px;
  width: 100%;
}
</style>
