/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import apiClient from "../../../api/API_CLIENT";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

interface UseLoginReturn {
  login: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const navigate = useNavigate();
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient
        .post("/auth/login", { username, password })
        .then((res) => {
          setAuthData(res.data.token, res.data.refreshToken, {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            gender: res.data.gender,
            image: res.data.image,
          });
          notifications.show({
            title: `Logged in as ${username}`,
            message: `Welcome back!`,
            color: "blue",
            position: "top-center",
          });

          navigate("/products/category/beauty");
        })
        .catch((err) => {
          setError(err.message);
          notifications.show({
            title: `Failed to login as ${username}`,
            message: `Try again later`,
            color: "red",
            position: "top-center",
          });
        });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeAuthData();
  };

  return { login, isLoading, error, logout };
};
