import { defineStore } from "pinia";
import { fetchBranches } from "@/services/branchService";
import { Branch } from "@/types/BranchMangement.type";

export const useBranchStore = defineStore("branches", {
  state: () => ({
    branches: [] as Branch[],
    fetchLoading: false,
    disableLoading: false,
    disabReservationBtn: false,
  }),
  getters: {
    getBranches: (state): Branch[] => state.branches,
    isFetchLoading: (state): boolean => state.fetchLoading,
    isDisableBtnLoading: (state): boolean => state.disableLoading,
    isdisabReservationBtnDisabled: (state): boolean =>
      state.disabReservationBtn,
    getActiveBranches: (state): Branch[] => {
      return state.branches.filter((branch) => branch.accepts_reservations);
    },
    getInactiveBranches: (state): Branch[] => {
      return state.branches.filter((branch) => !branch.accepts_reservations);
    },
  },
  actions: {
    async fetchBranches() {
      this.fetchLoading = true;
      try {
        const response = await fetchBranches();
        this.branches = response.data;
      } catch (error) {
        console.error("Failed to fetch branches", error);
      } finally {
        this.fetchLoading = false;
      }
    },
    updateBranchResrvationAcceptanceStatus(id: string, status: boolean) {
      console.log("---------------", status);

      let index = this.branches.findIndex((branch) => branch.id === id);
      if (index !== -1) {
        this.branches[index].accepts_reservations = status;
      } else {
        console.error(`branch with id ${id} not found`);
      }
    },

    updateFullBranchSettings(id: string, branch: Branch) {
      let index = this.branches.findIndex((branch) => branch.id === id);
      if (index !== -1) {
        this.branches[index] = branch;
      } else {
        console.error(`branch with id ${id} not found`);
      }
    },
    setFetchLoading(value: boolean) {
      this.fetchLoading = value;
    },
  },
});
