import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";

export const useGetAllProducts = (limit: number = 10, skip: number = 0) => {
  return useQuery({
    // Include limit and skip in queryKey to ensure query is refetched when they change
    queryKey: ["allProducts", limit, skip],

    queryFn: async () => {
      const { data } = await apiClient.get(
        `/products/?limit=${limit}&skip=${skip}`
      );
      return data;
    },
  });
};
