<template>
  <li
    class="p-6 flex items-center justify-between bg-white last:rounded-b-xl"
    :class="{ isAction: 'scale-150' }"
  >
    <div class="mr-4">
      <span class="text-stone-500 font-thin">{{ computedTime }}</span>
      <p>{{ item.title }}</p>
    </div>
    <div class="flex items-center relative">
      <button type="button " class="c-btn z-10" @click="toggleAction">
        <div
          class="w-full h-full absolute top-0 left-0 transition"
          :class="{ 'scale-0 opacity-0': isAction }"
        >
          <icon :name="'options'"></icon>
        </div>
        <div
          class="w-full h-full p-2 absolute top-0 left-0 transition scale-100 opacity-100"
          :class="{ 'scale-0': !isAction }"
        >
          <icon :name="'close'"></icon>
        </div>
      </button>

      <div class="absolute top-0 w-full h-full right-0">
        <button
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none"
          :class="{
            '-translate-x-8 -translate-y-10 opacity-100 pointer-events-auto':
              isAction,
          }"
          @click="closeAction"
        >
          <icon :name="'basic-tick'"></icon>
        </button>
        <button
          @click="closeAction"
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-100"
          :class="{
            '-translate-x-14 opacity-100 pointer-events-auto': isAction,
          }"
        >
          <icon :name="'pen'"></icon>
        </button>
        <button
          @click="closeAction"
          type="button"
          class="c-btn p-2 absolute top-0 right-0 opacity-0 transition-all pointer-events-none delay-200"
          :class="{
            '-translate-x-8 translate-y-10 opacity-100 pointer-events-auto':
              isAction,
          }"
        >
          <icon :name="'delete'"></icon>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
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
  },
  data() {
    return {
      isAction: false,
    };
  },

  methods: {
    toggleAction() {
      this.$data.isAction = !this.$data.isAction;
      this.$emit("openedAction", this.$data.isAction);
    },
    closeAction() {
      this.$data.isAction = false;
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
};
</script>
