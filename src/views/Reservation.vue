<template>
    <div class="container mx-auto bg-white border rounded-lg dark:bg-dark">
      <FTable   
        :headers="['Branch Name', 'Reference', 'Tables', 'Reservation Duration', 'Actions']"
        :columns="['name', 'reference', 'numTables', 'reservation_duration', 'actions']"
        :data="getActiveBranches"
        :loading="isFetchLoading"
        @rowClick="openEditDialog">
        <template #table-header>
          <div class="flex items-center justify-end gap-2 px-3 py-2 sm:p-6">
            <AddNewBranch/>
            <DisableReservationsBtn/> 
          </div>
         </template>   
        <template #numTables="{ row }">
          <span class="text-gray-700 dark:text-white">{{ getNumberOfTables(row) }}</span>
        </template>

        <template #reservation_duration="{ row }">
          <span class="text-gray-700 dark:text-white">{{ row.reservation_duration }} Minutes</span>
        </template>
        <template #actions="{ row }">
          <div class="flex items-center justify-center w-full gap-2">
            <div class=" transition duration-500 transform hover:scale-110 hover:translate-x-0.5" @click.stop="openEditDialog(row)">
              <LucideEdit  class="w-6 h-6 cursor-pointer text-info"/>
            </div>
            <div class="transition duration-500 transform hover:scale-110 hover:translate-x-0.5" @click.stop="deactivateSelectedBranches(row)">
              <FluentMdl2DeactivateOrders  class="w-6 h-6 cursor-pointer text-danger"/>
            </div>

          </div>
        </template>
      </FTable>
      <EditBranch v-if="selectedBranchToUpdate" :isModalOpen="isModalOpen" :selected-branch="selectedBranchToUpdate" @updateModalState="closeEditDialog" />
    </div>
</template>

<script setup lang="ts">
import { updateBranchReservations } from "@/services/branchService";
import { useBranchStore } from "@/store/branches";
import { Branch } from "@/types/BranchMangement.type";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const branchStore = useBranchStore();
const { getActiveBranches, isFetchLoading } = storeToRefs(branchStore);
const isModalOpen = ref<boolean>(false);
const selectedBranchToUpdate = ref<Branch>();


onMounted(() => {
  branchStore.fetchBranches();
})


const getNumberOfTables = computed(() => {
  return (branch: Branch): number => {
    return (
      branch.sections?.reduce((total, section) => {
        return (
          total +
          (section.tables?.filter((table) => table.accepts_reservations === true).length || 0)
        );
      }, 0) || 0
    );
  };
});

const deactivateSelectedBranches = async (branch: Branch) => {
  try {
    if (branch.id) {
      branchStore.setFetchLoading(true);
      branchStore.updateBranchResrvationAcceptanceStatus
      const res = await updateBranchReservations({
        "accepts_reservations": false
      }, branch.id);
      if (res.data.accepts_reservations === false && res.data.id === branch.id) {
        branchStore.updateBranchResrvationAcceptanceStatus(branch.id, false);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
      branchStore.setFetchLoading(false);
  }
};
const openEditDialog = (branch: Branch) => {
  selectedBranchToUpdate.value = branch;
  isModalOpen.value = true;
}

const closeEditDialog = (e: boolean) => {
  if(!e){
    selectedBranchToUpdate.value = undefined;
    isModalOpen.value = false;
  }
};
</script>