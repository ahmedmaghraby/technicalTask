<template>
  <div>
    <div class="mb-1">
      <span class="block text-sm font-medium text-slate-800 dark:text-white">
        {{label}}
      </span>
    </div>
    <div ref="selectBody" class="relative w-full">
      <div @click="toggleSelect">
        <template v-if="!styless">
          <div class="flex items-center justify-between gap-1 p-2 border rounded-lg cursor-pointer select-none"
            :class="headerClasses">
            <div class="flex-grow flex flex-wrap gap-1 w-[calc(100%-40px)]">
              <slot name="select-labels">
                {{ selectedLabel }}
              </slot>
            </div>
            <div v-if="downArrow" class="flex items-center justify-center flex-shrink-0 w-8">
              <RiArrowUpSFill class="text-gray-700 duration-300 bi bi-play-fill"
                :class="{ '-rotate-180': !displayBody, 'rotate-0': displayBody }" />
            </div>
          </div>
        </template>
        <template v-else>
          <slot name="select-labels" />
        </template>
      </div>

      <transition name="select-option">
        <div v-if="displayBody"
          class="absolute z-10 w-full p-3  bg-white dark:bg-gray-800 top-[105%] max-h-60 overflow-auto"
          :class="[!styless ? 'border rounded-lg shadow-lg' : '', searchKey && !hideSearchInput ? 'pt-0' : '', bodyClasses]">
          <div v-if="searchKey && !hideSearchInput" class="sticky top-0 z-10 py-2 bg-white dark:bg-gray-800">
            <FInput v-model="search" type="text" placeholder="Search..." />
          </div>

          <!-- Options -->
          <template v-if="filteredOptions.length">
            <div v-for="(option, index) in filteredOptions" :key="index"
              class="flex items-center gap-2 p-2 cursor-pointer "
              :class="[optionSelected(option) ? activeClass : 'hover:bg-gray-100 hover:dark:bg-gray-700 text-gray-800 dark:text-white', optionClasses]"
              @click="selectOption(option)" role="option" :aria-selected="optionSelected(option)">

              <slot name="select-option" :option="option" :selected="optionSelected(option)">
                {{ getOptionLabel(option) }}
              </slot>
            </div>
          </template>

          <!-- No Results -->
          <template v-else>
            <slot name="select-option-empty">
              <p class="text-center text-gray-500 dark:text-gray-200">No results found</p>
            </slot>
          </template>
        </div>
      </transition>
    </div>
      <p v-if="errorMessage " class="mt-1 text-sm text-danger">{{ errorMessage  }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from "vue";

export default defineComponent({
  name: "FSelect",
  props: {
    options: { type: Array as () => any[], default: () => [] },
    value: { type: [String, Number, Array<String>, Array<Number>, Object, Array<Object>], default: null },
    styless: { type: Boolean, default: false },
    multiselect: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    downArrow: { type: Boolean, default: true },
    selectKey: { type: String, default: "id" },
    searchKey: { type: String, default: "" },
    hideSearchInput: { type: Boolean, default: false },
    headerClasses: { type: String, default: "" },
    bodyClasses: { type: String, default: "" },
    optionClasses: { type: String, default: "" },
    activeClass: { type: String, default: "bg-primary-50 dark:bg-gray-200 text-gray-800" },
    label: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
  },
  emits: ["input"],
  setup(props, { emit }) {
    const displayBody = ref(false);
    const search = ref("");
    const selectBody = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (selectBody.value && !selectBody.value.contains(event.target as Node)) {
        displayBody.value = false;
      }
    };

    // Close dropdown on Escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") displayBody.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keyup", handleEscapeKey);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keyup", handleEscapeKey);
    });

    // Filter options based on search
    const filteredOptions = computed(() => {
      if (!search.value) return props.options;
      return props.options.filter((option) =>
        typeof option === "object"
          ? option[props.searchKey]?.toLowerCase().includes(search.value.toLowerCase())
          : option.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Get selected label
    const selectedLabel = computed(() => {
      if (props.multiselect) {
        return Array.isArray(props.value)
          ? props.value.map(getOptionLabel).join(", ")
          : "";
      }
      return getOptionLabel(props.value);
    });

    // Get option label dynamically
    const getOptionLabel = (option: any) =>
      typeof option === "object" ? option[props.searchKey] || option[props.selectKey] : option;

    // Check if option is selected
    const optionSelected = (option: any) => {
      if (props.multiselect) {
        return Array.isArray(props.value)
          ? props.value.some((item) =>
            typeof item === "object"
              ? item[props.selectKey] === option[props.selectKey]
              : item === option
          )
          : false;
      }
      return props.value === option;
    };

    // Select an option
    const selectOption = (option: any) => {
      let newValue;
      if (props.multiselect) {
        if (Array.isArray(props.value)) {
          newValue = [...props.value];
          const index = newValue.findIndex((item) =>
            typeof item === "object"
              ? item[props.selectKey] === option[props.selectKey]
              : item === option
          );
          if (index === -1) newValue.push(option);
          else newValue.splice(index, 1);
        } else {
          newValue = [option];
        }
      } else {
        newValue = option;
        displayBody.value = false;
      }
      emit("input", newValue);
    };

    const toggleSelect = () => {
      if (!props.disabled) displayBody.value = !displayBody.value;
    };

    return {
      displayBody,
      selectBody,
      search,
      filteredOptions,
      selectedLabel,
      getOptionLabel,
      optionSelected,
      selectOption,
      toggleSelect,
    };
  },
});
</script>

<style scoped>
.select-option-enter-active,
.select-option-leave-active {
  transition: all 0.2s ease;
}

.select-option-enter-from,
.select-option-leave-to {
  opacity: 0;
  transform: translateY(-1px);
}
</style>