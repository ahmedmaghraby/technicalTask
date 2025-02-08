<template>
    <div>
        <FButton style-type="primary" variant="outline" @click="openModal">
            Add Branches
        </FButton>

        <FModal v-model="isModalOpen" title="Add Branches" :actions="modalActions">
            <div class="p-4 ">
                <FSelect label="Select Branches" v-model="selectedBranches" :options="getInactiveBranches" selectKey="id" searchKey="name"
                    multiselect>
                    <template #select-labels>
                        <div v-if="selectedBranches.length" class="overflow-y-auto max-h-28">
                            <span v-for="(option, index) in selectedBranches"
                                 :key="index"
                                class="inline-flex items-center gap-1 px-2 py-1 mr-1 text-sm font-medium leading-none border rounded-lg text-primary border-primary">
                                {{ option.name }}
                                <div @click.stop="selectedBranches.splice(index, 1)" class="">
                                    <EpCloseBold  class="w-3 h-3 text-primary hover:text-gray-400" />
                                </div>
                            </span>
                        </div>
                        <div class=" text-slate-800 dark:text-white" v-else>Select Branches</div>
                    </template>

                    <template #select-option="{ option }">
                        <span class="font-bold text-inherit">{{ option.name }}</span>
                        <span v-if="option.reference" class="text-gray-500 dark:text-gray-300"> (Ref: {{ option.reference }})</span>
                    </template>
                </FSelect>
            </div>
        </FModal>
    </div>
</template>

<script setup lang="ts">
import { updateBranchReservations } from "@/services/branchService";
import { useBranchStore } from "@/store/branches";
import { Branch } from "@/types/BranchMangement.type";
import { ModalActions } from "@/types/MoleculesProps.type";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const branchStore = useBranchStore();
const { getInactiveBranches } = storeToRefs(branchStore);

const emit = defineEmits(["updateBranches"]);


const selectedBranches = ref<Branch[]>([]);

const isModalOpen = ref(false);
const isLoading = ref(false);

const modalActions = ref<ModalActions[]>([
    { label: "Cancel", type: "gray", closeOnClick: true },
    { label: "Activate", type: "primary", isLoading: isLoading.value, isDisabled: selectedBranches?.value?.length === 0 || isLoading.value, onClick: () => { activateSelectedBranches(); } },
]);
watch(selectedBranches, () => {
    modalActions.value[1].isDisabled = selectedBranches.value.length === 0 || isLoading.value;
})

watch(isLoading, () => {
    modalActions.value[1].isDisabled = selectedBranches.value.length === 0 || isLoading.value;
})
const openModal = () => {
    isModalOpen.value = true;
}
const activateSelectedBranches = async () => {
    isLoading.value = true;
    branchStore.setFetchLoading(true);
    try {
         for (const branch of selectedBranches.value) {
             if (branch.id) {
                const res = await updateBranchReservations({
                    "accepts_reservations": true
                }, branch.id);
                if (res.data.accepts_reservations === true && res.data.id === branch.id) {
                    branchStore.updateBranchResrvationAcceptanceStatus(branch.id, true);
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        isModalOpen.value = false;
        selectedBranches.value = [];
        isLoading.value = false;
        branchStore.setFetchLoading(false);
        emit("updateBranches");
    }
};
</script>
