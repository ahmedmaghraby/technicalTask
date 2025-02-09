<template>
  <div class="w-full">
    <div v-if="label" class="mb-1">
      <span class="block text-sm font-medium text-slate-800 dark:text-white">
        {{ label }}<span class="text-red-500" v-if="required">*</span>
      </span>
    </div>

    <div class="flex items-center justify-between gap-1 p-2 border rounded-lg cursor-pointer select-none">
      <div class="flex-grow flex flex-wrap gap-1 w-[calc(100%-40px)]">
        <template v-if="selectedTimeSlots.length > 0">
          <div v-for="(yourTimeValue, index) in selectedTimeSlots"  class="slot-container" :key="index">
            <vue-timepicker v-for="(time, key) in yourTimeValue" :key="key" format="HH:mm" lazy manual-input
              hide-clear-button hide-dropdown auto-scroll :value="time" @change="(e)=>slotSelected(e, index, key)">
            </vue-timepicker>
            <div class="absolute top-0 -right-0.5 translate-x-0.5 -translate-y-1.5 hover:scale-110" @click="removeSlot(index)">
              <ZondiconsCloseSolid class="text-primary dark:text-white" />
            </div>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-500 opacity-50 dark:text-gray-200">
            {{ placeholder ?? "Select your Time Slots" }}
          </p>
        </template>
      </div>
      <div class="flex items-center justify-center flex-shrink-0 w-8" @click="addSlot">
        <IconParkOutlineAdd class="text-primary dark:text-white" />
      </div>
    </div>
    <p v-if="errorMessage || localErrorMessage" class="mt-1 text-sm text-danger">{{ errorMessage || localErrorMessage }}
    </p>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";

export default {
  name: "FTimeSlot",
  components: {
    VueTimepicker,
  },
  props: {
    options: { type: Array, default: () => [] },
    value: { type: Array, default: () => [[], []] },
    label: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
  },
  data() {
    return {
      selectedTimeSlots: this.value ?? [[], []],
      localErrorMessage: "",
    };
  },
  methods: {
    slotSelected(time, index, key) {
      this.selectedTimeSlots[index][key] = time.displayTime;
      this.$emit("input", this.selectedTimeSlots);
    },
    addSlot() {
      if (this.selectedTimeSlots.length < 3) {
        this.selectedTimeSlots.push(["", ""]);
      } else {
        this.localErrorMessage = "You cannot add more than 3 slots";
      }
    },
    removeSlot(index) {
      this.selectedTimeSlots.splice(index, 1);
    },
  },
  watch: {
    value(newValue) {
      this.selectedTimeSlots = newValue;
    },
  },
  mounted() {
    this.selectedTimeSlots = this.value;
  },
};
</script>