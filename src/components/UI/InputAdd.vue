<template>
  <div class="h-10">
    <transition>
      <strong
        v-show="inputError"
        class="block w-full text-center mb-4 text-primary"
        >Try input something else..</strong
      >
    </transition>
  </div>
  <div class="relative mb-4">
    <input
      class="w-full h-42 p-4 pr-14 rounded-xl"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="addTodoItem"
      placeholder="Add todo task..."
    />
    <transition>
      <button
        v-show="modelValue"
        @click="addTodoItem"
        type="button"
        class="c-btn p-2 absolute right-4 top-[50%] translate-y-[-50%]"
      >
        <icon :name="'basic-tick'"></icon>
      </button>
    </transition>
  </div>
</template>
<script>
import icon from "./Icon.vue";

export default {
  props: ["modelValue", "inputError"],
  emits: ["addTodoItem", "update:modelValue"],

  components: {
    icon,
  },

  methods: {
    addTodoItem() {
      this.$emit("addTodoItem");
    },
  },
};
</script>
