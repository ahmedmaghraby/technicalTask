<template>
  <component
    :is="tag"
    :class="computedClasses"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "FHeading",
  props: {
    level: {
      type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
      default: 2,
      validator: (value: number) => value >= 1 && value <= 6,
    },
    customClasses: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const tag = computed(() => `h${props.level}`);

    const computedClasses = computed(() => {
      const sizeClasses = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
      };
      return `${sizeClasses[props.level]} ${props.customClasses}`;
    });

    return { tag, computedClasses };
  },
});
</script>