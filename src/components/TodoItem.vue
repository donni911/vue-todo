<template>
  <li
    class="p-6 flex items-center justify-between bg-white last:rounded-b-xl transition-all"
    :class="{ 'scale-105 drop-shadow-xl': isOpen }"
  >
    <div class="flex flex-col mr-4">
      <div>
        <span class="text-stone-500 font-thin">{{ item.recordingTime }}</span>
      </div>
      <div class="flex flex-col">
        <p class="c-line break-all" :class="{ 'c-line-active': item.resolved }">
          {{ item.title }}
        </p>
        <transition name="fade" mode="out-in">
          <input
            v-show="editMode"
            v-model="editText"
            @keyup.enter="editTodo"
            ref="editInput"
            class="focus:border-0 mt-4 w-full border-primary-200 h-8 p-1 rounded-xl"
            type="text"
            placeholder="Edit todo"
          />
        </transition>
      </div>
    </div>
    <actions
      :editMode="editMode"
      :isOpen="isOpen"
      @toggle-action="toggleAction"
      @resolved-action="resolvedAction"
      @change-open-action="changeOpenAction"
      @edit-todo="editTodo"
      @delete-action="deleteAction"
    />
  </li>
</template>

<script>
import store from "../store";
import Actions from "./UI/Actions.vue";

export default {
  components: {
    Actions,
  },

  data() {
    return {
      editMode: false,
      editText: "",
    };
  },

  props: {
    item: {
      type: Object,
    },
    isOpen: {
      type: Boolean,
    },
    isResolved: { type: Boolean },
  },

  methods: {
    toggleAction() {
      this.$el.scrollIntoView({ behavior: "smooth" });

      if (this.editMode) {
        this.editMode = false;
      }
      this.$emit("openedAction", this.$props.item);
    },

    handleClickOutside(event) {
      if (this.$props.isOpen && !event.composedPath().includes(this.$el)) {
        if (this.editMode) {
          this.editMode = false;
        }
        this.$emit("close");
      }
    },

    changeOpenAction() {
      this.editMode = true;
      this.editText = this.$props.item.title;

      this.$nextTick(() => {
        this.$refs.editInput.focus();
        this.$el.scrollIntoView({ behavior: "smooth" });
      });
    },

    editTodo() {
      if (this.editText) {
        this.$props.item.title = this.editText;
        this.editMode = false;
      } else {
        this.deleteAction();
      }
      this.$emit("close");
    },

    resolvedAction() {
      if (this.editMode) {
        this.editMode = false;
      }
      this.$emit("close");
      store.commit("RESOLVE_TASK", this.$props.item);
    },

    deleteAction() {
      store.dispatch("deleteTask", this.$props.item);
    },
  },

  computed: {
    computedDate() {
      return this.$props.item.recordingTime.toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
