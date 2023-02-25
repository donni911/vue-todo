<template>
  <li
    class="p-6 flex items-center justify-between bg-white last:rounded-b-xl transition"
    :class="{ 'scale-105 drop-shadow-xl': isOpen }"
  >
    <div class="mr-4">
      <span class="text-stone-500 font-thin">{{ computedTime }}</span>
      <p class="c-line break-all" :class="{ 'c-line-active': item.resolved }">
        {{ item.title }}
      </p>
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
        <button
          @click="changeAction"
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-100"
          :class="{
            '-translate-x-14 opacity-100 pointer-events-auto': isOpen,
          }"
        >
          <icon :name="'pen'"></icon>
        </button>
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
  props: {
    item: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
    },
    isResolved: { type: Boolean },
  },

  methods: {
    toggleAction() {
      this.$emit("openedAction", this.$props.item);
    },

    handleClickOutside(event) {
      if (this.$props.isOpen && !event.composedPath().includes(this.$el)) {
        this.$emit("close");
      }
    },

    changeAction() {
      this.$props.item.title = "resolved";
    },

    resolvedAction() {
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
    computedTime() {
      return this.$props.item.recordingTime.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
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
