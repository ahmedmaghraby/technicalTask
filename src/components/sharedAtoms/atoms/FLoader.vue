<template>

<div role="status">

    <TablerLoader2  class="animate-spin" :class="[size, color]" />
    <span class="sr-only">Loading...</span>
</div>


</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "FLoader",
  props: {
    size: {
      type: String,
      default: "w-4 h-4",
    },
    color: {
      type: String,
      default: "text-primary",
    }
  },
  setup(props) {
    const { size, color } = toRefs(props);
    return { size, color };
  },
});
</script>