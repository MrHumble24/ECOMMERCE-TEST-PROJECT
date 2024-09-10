import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";
import { ProductResponse } from "../../../interface/products";

export const useSearchProducts = (searchTerm: string) => {
  return useQuery<ProductResponse>({
    queryKey: ["searchProducts", searchTerm],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/search?q=${searchTerm}`);
      return data;
    },
  });
};
