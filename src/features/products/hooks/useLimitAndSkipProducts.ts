import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";

export const useLimitAndSkipProducts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["limitAndSkipProducts", limit, skip],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/products?limit=${limit}&skip=${skip}`
      );
      return data;
    },
  });
};
