import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import apiClient from "../../../api/API_CLIENT";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
      notifications.show({
        title: "Success",
        message: "Product deleted successfully",
        position: "top-center",
      });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Failed to delete product",
        message: "Try again later",
        position: "top-center",
      });
    },
  });
};
