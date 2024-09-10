import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";

export const useSortProducts = (sortBy: string) => {
  return useQuery({
    queryKey: ["sortProducts", sortBy],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products?sort=${sortBy}`);
      return data;
    },
  });
};
