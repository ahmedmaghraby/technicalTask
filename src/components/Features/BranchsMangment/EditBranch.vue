<template>
    <div>
        <FModal v-model="localIsModalOpen" :title="`Edit ${selectedBranch?.name} settings`" :actions="modalActions">
            <FToast
                :toastMsg="`Branch working hours are ${selectedBranch?.opening_from} - ${selectedBranch?.opening_to}`"
                :toastType="'info'" :show-close-btn="false" />
            <div class="flex flex-col gap-3 px-2 pt-4 overflow-y-auto max-h-96">
                <FInput v-model="editableBranchObject.reservation_duration" :required="true"
                    label="Reservation Duration (minutes)" type="number" :error-message="editableBranchObject.reservation_duration ? '' : 'This field is required'" />

                <FSelect v-model="selectedTables" :options="tables" label="Select Tables"
                    selectKey="id" :error-message="selectedTables ? '' : 'This field is required'"
                    searchKey="composite_name" multiselect>
                    <template #select-labels>
                        <div v-if="selectedTables.length" class="overflow-y-auto max-h-28">
                            <span v-for="(option, index) in selectedTables" :key="index"
                                class="inline-flex items-center gap-1 px-2 py-1 mr-1 text-sm font-medium leading-none border rounded-lg text-primary border-primary">
                                {{ option.composite_name }}
                                <div @click.stop="selectedTables.splice(index, 1)" class="">
                                    <EpCloseBold class="w-3 h-3 text-primary hover:text-gray-400" />
                                </div>
                            </span>
                        </div>
                        <div class=" text-slate-800 dark:text-white" v-else>Select Tables</div>
                    </template>

                    <template #select-option="{ option }">
                        <span class="font-bold text-inherit">{{ option.composite_name }}</span>
                    </template>
                </FSelect>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-1" v-for="(day, index) in sortedReservationTimes"
                        :key="index + day.dayName">
                        <span class="flex items-center justify-between text-sm font-medium text-slate-800 dark:text-white">{{ day.dayName }} <span class="cursor-pointer text-primary" @click="ApplyOnAllDays" v-if="index==0">Apply on all days</span>
                    </span>
                        <FTimeSlot :value="day.times" @input="handleTimeSlotChange" :required="true" />
                    </div>
                </div>
            </div>
        </FModal>
    </div>
</template>

<script setup lang="ts">
import { updateBranchReservations } from "@/services/branchService";
import { useBranchStore } from "@/store/branches";
import { Branch, TableTempDisplay } from "@/types/BranchMangement.type";
import { ModalActions } from "@/types/MoleculesProps.type";
import { dayOrder } from "@/utils/dataUtils";
import { computed, onMounted, PropType, ref, watch } from "vue";

const branchStore = useBranchStore();
const isLoading = ref(false);
const editableBranchObject = ref<Branch>({});
const selectedTables = ref<TableTempDisplay[]>([]);
const emit = defineEmits(["updateModalState"]);
const props = defineProps({
    isModalOpen: {
        type: Boolean,
        default: false
    },
    selectedBranch: {
        type: Object as PropType<Branch>,
        required: true

    }
})

const localIsModalOpen = computed({
    get: () => props.isModalOpen,
    set: (value) => emit("updateModalState", value)
});

const tables = computed(() => {
    return props?.selectedBranch?.sections?.reduce((acc: TableTempDisplay[], section) => {
        return [...acc, ...(section.tables?.map((table) => ({
            ...table,
            section_name: section.name,
            composite_name: `${section.name} - ${table.name}`
        })) || [])];
    }, [] as TableTempDisplay[]);
})
const sortedReservationTimes = computed(() => {
    if (props?.selectedBranch?.reservation_times) {
        return dayOrder
            .filter(day => props.selectedBranch?.reservation_times?.[day])
            .map(day => ({
                dayName: day,
                times: props.selectedBranch?.reservation_times?.[day] ?? []
            }));
    } else {
        return [];
    }
})

onMounted(() => {
    if (props?.selectedBranch) {
        editableBranchObject.value = Object.assign({}, props?.selectedBranch);
        selectedTables.value = (props?.selectedBranch?.sections ?? []).reduce((acc: TableTempDisplay[], section) => {
            return acc.concat(
                (section.tables?.filter(table => table.accepts_reservations).map(table => ({
                    ...table,
                    section_name: section.name,
                    composite_name: `${section.name} - ${table.name}`
                })) || [])
            );
        }, [] as TableTempDisplay[]);
    }
});
watch(props?.selectedBranch, () => {
    if (props?.selectedBranch) {
        editableBranchObject.value = Object.assign({}, props?.selectedBranch);
    }
})

const modalActions = ref<ModalActions[]>([
    { label: "Cancel", type: "gray", closeOnClick: true },
    {
        label: "Activate", type: "primary", isLoading: isLoading.value,
        onClick: () => {
             updateBranchSettings();
        }
    },
]);

const handleTimeSlotChange = (times: string[][], day: string) => {
    if (editableBranchObject.value.reservation_times) {
        editableBranchObject.value.reservation_times[day] = times;
    }
}

const ApplyOnAllDays= () =>{
 if (editableBranchObject.value.reservation_times && editableBranchObject.value.reservation_times.saturday) {
          const saturdayTimes = editableBranchObject.value.reservation_times.saturday;
          for (let index = 1; index < dayOrder.length; index++) {
            const day = dayOrder[index];
            editableBranchObject.value.reservation_times[day] = [...saturdayTimes];
          }
    }
}

const updateBranchSettings = async () => {
  try {
    isLoading.value = true;
    if (editableBranchObject?.value?.id) {
      branchStore.setFetchLoading(true);
      branchStore.updateBranchResrvationAcceptanceStatus
      const res = await updateBranchReservations({
        "reservation_duration": editableBranchObject?.value?.reservation_duration,
        "reservation_times": editableBranchObject?.value?.reservation_times
      }, editableBranchObject?.value?.id);
      if (res.data.id === editableBranchObject?.value?.id) {
        branchStore.updateFullBranchSettings(editableBranchObject?.value?.id, editableBranchObject?.value);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
      branchStore.setFetchLoading(false);
      localIsModalOpen.value = false;
      selectedTables.value = [];
      editableBranchObject.value = {};
      isLoading.value = false;
  }
};
</script>
