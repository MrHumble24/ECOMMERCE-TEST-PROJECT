import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/API_CLIENT";
import { ProductCategories } from "../../../interface/ProductCategory";

export const useGetAllProductCategories = () => {
  return useQuery<ProductCategories | null>({
    queryKey: ["allProductCategories"],
    queryFn: async () => {
      const { data } = await apiClient.get("/products/categories");
      return data;
    },
  });
};
