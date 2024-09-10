import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";
import { ProductResponse } from "../../../interface/products";

export const useGetProductsByCategory = (
  category: string,
  limit: number = 10,
  skip: number = 0
) => {
  console.log("repeated");
  return useQuery<ProductResponse>({
    queryKey: ["productsByCategory", category, limit, skip],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/products/category/${category}?limit=${limit}&skip=${skip}`
      );
      return data;
    },
  });
};
