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
        <transition name="fade" mode="out-in">
          <input
            class="focus:border-0 w-full border-primary-200 h-8 p-1 rounded-xl"
            v-show="editMode"
            v-model="editText"
            @keyup.enter="editTodo"
            ref="editInput"
            type="text"
            placeholder="Edit todo"
          />
        </transition>
        <p class="c-line break-all" :class="{ 'c-line-active': item.resolved }">
          {{ item.title }}
        </p>
      </div>
    </div>
    <div class="flex items-center relative">
      <button type="button" class="c-btn z-10" @click="toggleAction">
        <div
          class="w-full h-full absolute top-0 left-0 transition"
          :class="{ 'scale-0 opacity-0': isOpen }"
        >
          <icon :name="'options'"></icon>
        </div>
        <div
          class="w-full h-full p-2 absolute top-0 left-0 transition scale-0 opacity-0"
          :class="{ 'scale-100 opacity-100 ': isOpen }"
        >
          <icon :name="'close'"></icon>
        </div>
      </button>

      <div class="absolute top-0 w-full h-full right-0">
        <button
          @click="resolvedAction"
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none"
          :class="{
            '-translate-x-8 -translate-y-10 opacity-100 pointer-events-auto':
              isOpen,
          }"
        >
          <icon :name="'basic-tick'"></icon>
        </button>
        <transition name="fade" mode="out-in">
          <button
            v-if="!editMode"
            @click="changeOpenAction"
            type="button"
            class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-100"
            :class="{
              '-translate-x-14 opacity-100 pointer-events-auto': isOpen,
            }"
          >
            <icon :name="'pen'"></icon>
          </button>
          <button
            v-else
            @click="editTodo"
            type="button"
            class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-100"
            :class="{
              '-translate-x-14 opacity-100 pointer-events-auto': isOpen,
            }"
          >
            <icon
              :classes="'[&>g>path]:fill-secondary'"
              :name="'basic-tick'"
            ></icon>
          </button>
        </transition>
        <button
          @click="deleteAction"
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-200"
          :class="{
            '-translate-x-8 translate-y-10 opacity-100 pointer-events-auto':
              isOpen,
          }"
        >
          <icon :name="'delete'"></icon>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import store from "../store";
import Icon from "./UI/Icon.vue";

export default {
  components: {
    Icon,
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
      this.$nextTick(() => {
        this.$refs.editInput.focus();
        this.editText = this.$props.item.title;
      });
    },

    editTodo() {
      if (this.editText) {
        this.$props.item.title = this.editText;
        this.editMode = false;
      } else {
        this.deleteAction();
      }
    },

    resolvedAction() {
      if (this.editMode) {
        this.editMode = false;
      }
      this.$emit("close");
      this.$props.item.resolved = !this.$props.item.resolved;
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
