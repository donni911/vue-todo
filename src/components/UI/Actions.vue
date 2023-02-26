<template>
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
</template>

<script>
import Icon from "./Icon.vue";

export default {
  components: {
    Icon,
  },

  props: {
    isOpen: Boolean,
    editMode: Boolean,
  },
  methods: {
    toggleAction() {
      this.$emit("toggle-action");
    },
    resolvedAction() {
      this.$emit("resolved-action");
    },
    changeOpenAction() {
      this.$emit("change-open-action");
    },
    editTodo() {
      this.$emit("edit-todo");
    },
    deleteAction() {
      this.$emit("delete-action");
    },
  },
};
</script>
