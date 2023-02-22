<template>
  <div>
    <div class="p-4">
      <ul class="mt-12">
        <TodoItem v-for="(item, index) in items" :item="item" />
      </ul>
    </div>
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
};
</script>
