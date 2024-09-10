import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";
import { Product } from "../../../interface/products";

export const useGetSingleProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/${id}`);
      return data;
    },
  });
};
