<template>
  <button
    :type="type"
    :disabled="isDisabled"
    class="f-btn"
    :class="computedClasses"
    :aria-busy="loading"
    @click="handleClick"
  >
    <div v-if="loading" class="flex items-center gap-1">
      <FLoader   color="text-white"/>
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "FButton",
  props: {
    type: {
      type: String as () => "button" | "submit" | "reset",
      default: "button",
    },
    styleType: {
      type: String as () => "primary" | "success" | "danger" | "gray",
      default: "primary",
    },
    variant: {
      type: String,
      default: "solid",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const computedClasses = computed(() => {
      const isOutline = props.variant === "outline";

      const styleClasses = {
        primary: isOutline ? "f-btn-primary-outline" : "f-btn-primary",
        success: isOutline ? "f-btn-success-outline" : "f-btn-success",
        danger: isOutline ? "f-btn-danger-outline" : "f-btn-danger",
        gray: isOutline ? "f-btn-gray-outline" : "f-btn-gray",
      };

      return `${styleClasses[props.styleType ?? "primary"] || ""} ${
        props.loading ? "flex gap-2 items-center" : ""
      }`;
    });

    const isDisabled = computed(() => props.disabled || props.loading);

    const handleClick = (event: Event) => {
      if (!isDisabled.value) {
        emit("click", event);
      }
    };

    return { computedClasses, isDisabled, handleClick };
  },
});
</script>