import { Branch } from "@/types/BranchMangement.type";
import { ApiResponse } from "@/types/global.type";
import apiClient from "@/utils/api";

export const fetchBranches = async (): Promise<ApiResponse<Branch[]>> => {
  try {
    const response = await apiClient.get(
      `/branches?include[0]=sections&include[1]=sections.tables`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

export const updateBranchReservations = async (
  updatedData: any,
  id: string
): Promise<ApiResponse<Branch>> => {
  try {
    const response = await apiClient.put(`/branches/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating branch reservations:", error);
    throw error;
  }
};
