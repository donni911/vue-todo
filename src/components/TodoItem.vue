<template>
  <li :class="classes">
    <h3>{{ item.title }}</h3>
    <div>{{ computedDate }}</div>
    <div>{{ computedTime }}</div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    classes() {
      return this.$props.item.resolved ? "bg-red-200" : "bg-green-200";
    },
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
