<template>
  <div class="mx-auto shadow-2xl shadow-primary-semi rounded-xl">
    <div
      class="p-6 bg-gradient-to-r grid grid-cols-[60%_40%] from-primary-semi to-primary text-white rounded-t-xl"
    >
      <div>
        <span>Today</span>
        <h6>
          {{ formatData }}
        </h6>
      </div>
      <transition name="fade">
        <div v-if="items.length" class="flex items-center justify-end">
          <button type="button" class="c-btn z-10" @click="resolveAll">
            <div
              class="w-full h-full p-2 top-0 left-0 transition scale-100 opacity-100"
            >
              <icon :name="'pen'"></icon>
            </div>
          </button>
          <button type="button" class="c-btn z-10 ml-4" @click="deleteAll">
            <div
              class="w-full h-full p-2 top-0 left-0 transition scale-100 opacity-100"
            >
              <icon :name="'delete'"></icon>
            </div>
          </button>
        </div>
      </transition>
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
import store from "../store";
import TodoItem from "./TodoItem.vue";
import Icon from "./UI/Icon.vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  components: {
    TodoItem,
    Icon,
  },

  data() {
    return {
      activeTodo: null,
      active: null,
    };
  },

  methods: {
    resolveAll() {
      store.commit("RESOLVE_TASKS");
    },

    deleteAll() {
      store.commit("DELETE_TASKS");
    },

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
