/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import apiClient from "../../../api/API_CLIENT";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: any) => {
      await apiClient.post("/products/add", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
      notifications.show({
        title: "Success",
        message: "Product added successfully",
        position: "top-center",
      });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Failed to add product",
        message: "Try again later",
        position: "top-center",
      });
    },
  });
};
