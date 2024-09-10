import { create } from "zustand";

interface SettingsStore {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  menuOpen: JSON.parse(localStorage.getItem("menuOpen") || "false"), // Default to false
  toggleMenu: () => {
    set((state) => {
      const newState = !state.menuOpen;
      localStorage.setItem("menuOpen", JSON.stringify(newState));
      return { menuOpen: newState };
    });
  },
}));

export default useSettingsStore;
