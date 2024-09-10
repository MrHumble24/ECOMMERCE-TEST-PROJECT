/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import apiClient from "../../../api/API_CLIENT";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updatedProduct,
    }: {
      id: number;
      updatedProduct: any;
    }) => {
      await apiClient.put(`/products/${id}`, updatedProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
      notifications.show({
        title: "Success",
        message: "Product updated successfully",
        position: "top-center",
      });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Failed to update product",
        message: "Try again later",
        position: "top-center",
      });
    },
  });
};
