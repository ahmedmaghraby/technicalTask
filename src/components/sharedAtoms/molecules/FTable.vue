<template>
  <div>
    <slot name="table-header" />
    <div class="overflow-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-y border-slate-200">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="p-3 text-center dark:text-white text-dark sm:p-5 min-w-[100px] max-w-sm"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <template v-if="data.length">
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              @click="rowClick(row)"
              class="cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-gray-800"
            >
              <td v-for="(col, colIndex) in columns" :key="colIndex" class="p-3 text-center dark:text-white text-dark sm:p-5">
                <slot :name="col" :row="row">
                  {{ row[col] }}
                </slot>
              </td>
            </tr>
          </template>
        
          <template v-else>
            <tr>
              <td :colspan="columns.length" class="p-3 text-center sm:p-5">
                No data available
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="loading">
          <div class="flex flex-col items-center w-full gap-3 p-8 w-fullflex sm:p-5 text-slate-600">
            <FLoader  class="text-primary"/> 
            <span>
              Loading...
            </span>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FTable",
  props: {
    headers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    columns: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["rowClick"],
  setup(_, { emit }) {
    const rowClick = (row: Record<string, any>) => {
      emit("rowClick", row);
    };

    return { rowClick };
  },
});
</script>