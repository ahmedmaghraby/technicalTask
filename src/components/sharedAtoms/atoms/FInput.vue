<template>
  <div class="w-full">
    <div v-if="label" class="mb-1">
        <span class="block text-sm font-medium text-slate-800 dark:text-white">
          {{label}}<span class="text-red-500" v-if="required">*</span>
        </span>
    </div>

    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!errorMessage"
      v-bind="$attrs"
      @input="updateValue"
      class="f-input"
      :class="computedClasses"
    />
    
    <p v-if="errorMessage" class="mt-1 text-sm text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { createUUID } from "@/utils/dataUtils";
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "FInput",
  props: {
    value: {
      type: [String, Number] as PropType<string | number>,
      default: "",
    },
    type: {
      type: String as PropType<"text" | "number" | "password" | "email" | "tel">,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: String as PropType<"form" | "underline" | "outline">,
      default: "form",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false
    },
    inputKey: {
      type: String,
      default: createUUID(),
    }
  },
  emits: ["input"],
  setup(props, { emit }) {
    // Handle input updates
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      let value: string | number = target.value;

      // Convert to number if type="number"
      if (props.type === "number") {
        value = Number(value);
        if (isNaN(value)) value = 0;
      }

      emit("input", value);
    };

    // Compute input classes dynamically
    const computedClasses = computed(() => {
      const styleVariants = {
        form: "f-input-form",
        underline: "f-input-underline",
        outline: "f-input-outline",
      };
      const errorClasses = props.errorMessage ? "f-input-error" : "";
      const disabledClasses = props.disabled ? "f-input-disabled" : "";

      return `${styleVariants[props.styleType] || ""} ${errorClasses} ${disabledClasses}`;
    });

    return { updateValue, computedClasses };
  },
});
</script>

<style scoped>
/* Hide number input spinners */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>