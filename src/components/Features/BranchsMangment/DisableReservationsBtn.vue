<template>
    <div>

        <FButton
          style-type="primary"
          class="disabled:opacity-50 disabled:cursor-not-allowed"
          @click="openModal"
          :disabled="!getActiveBranches?.length || isdisabReservationBtnDisabled"
          :loading="isDisableBtnLoading || isFetchLoading"
        >
          Disable Reservations
        </FButton>
         <FModal v-model="isModalOpen" title="Confirm Action" :actions="modalActions">
            <p class="text-slate-800 dark:text-white">Are you sure you want to proceed?</p>
          </FModal>
    </div>
</template>
<script setup lang="ts">
import { updateBranchReservations } from "@/services/branchService";
import { useBranchStore } from "@/store/branches";
import { ModalActions } from "@/types/MoleculesProps.type";
import { storeToRefs } from "pinia";
import { ref } from "vue";

  const branchStore = useBranchStore();
  const { isdisabReservationBtnDisabled, isDisableBtnLoading, isFetchLoading ,getActiveBranches } = storeToRefs(branchStore);
  const emit = defineEmits(["updateBranches"]);
  
  const isModalOpen = ref(false);
  const modalActions =ref<ModalActions[]>([
    { label: "Cancel", type: "gray", closeOnClick: true },
    { label: "Confirm", type: "danger", onClick: () => {deactivateSelectedBranches();} },
  ]);

  const openModal= ()=> {
    isModalOpen.value = true;
  }
  const deactivateSelectedBranches = async () => {
    
    try {
        branchStore.setFetchLoading(true);
        for (const branch of getActiveBranches.value) {
          if (branch.id) {
              const res = await updateBranchReservations({
                  "accepts_reservations": false
              }, branch.id);
              if (res.data.accepts_reservations === false && res.data.id === branch.id) {
                  branchStore.updateBranchResrvationAcceptanceStatus(branch.id, false);
              }
          }
        }
    } catch (error) {
        console.error(error);
    } finally {
        isModalOpen.value = false;
        branchStore.setFetchLoading(false);
        emit("updateBranches");
    }
};
</script>
