<template>
  <transition name="fade">
    <div
      v-if="value"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-30"
      @click.self="closeModal"
    >
      <transition name="modal-slide">
        <div ref="modalRef" class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800" :class="customClasses">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title }}</h2>
            <button @click="closeModal" >
              <EpCloseBold class="text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300" />
            </button>
          </div>

          <div class="mb-4">
            <slot></slot>
          </div>

          <div v-if="actions.length" class="flex justify-end space-x-2">
            <FButton v-for="(action, index) in actions"
              :key="index" 
              :class="action.class"
              :style-type="action.type"
              :is-loading="action.isLoading"
              :disabled="action.isDisabled"
              @click="handleAction(action)">
              {{ action.label }}
            </FButton>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted } from "vue";
import { ModalActions } from "@/types/MoleculesProps.type";

export default defineComponent({
  name: "FModal",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    actions: {
      type: Array as PropType<ModalActions[]>,
      default: () => [],
    },
    customClasses: {
      type: String,
      default: "",
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    const modalRef = ref<HTMLElement | null>(null);

    const closeModal = (): void => {
      emit("input", false);
    };

    const handleAction = (action: ModalActions): void => {
      if (action.onClick) action.onClick();
      if (action.closeOnClick !== false) closeModal();
    };

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") closeModal();
    };

    onMounted(() => {
      document.addEventListener("keydown", handleEscapeKey);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });

    return { modalRef, closeModal, handleAction };
  },
});
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.2s ease-in-out;
}
.modal-slide-enter,
.modal-slide-leave-to {
  transform: translateY(-10px);
}
</style>