import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuthData: (token: string, refreshToken: string, user: User) => void;
  removeAuthData: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: JSON.parse(localStorage.getItem("token") || "null"),
  refreshToken: JSON.parse(localStorage.getItem("refreshToken") || "null"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  // Calculate isAuthenticated based on the presence of a token and user
  isAuthenticated:
    !!localStorage.getItem("token") && !!localStorage.getItem("user"),

  // Function to set authentication data
  setAuthData: (token: string, refreshToken: string, user: User) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      refreshToken,
      user,
      isAuthenticated: true, // Set authenticated to true when the user logs in
    });
  },

  // Function to remove authentication data (logout)
  removeAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    set({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false, // Set authenticated to false when the user logs out
    });
  },
}));

export default useAuthStore;
