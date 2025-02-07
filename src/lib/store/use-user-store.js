import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      userName: null,
      isAdmin: false,
      login: (userName) => set({ userName, isAdmin: userName === "admin" }),
      logout: () => set({ userName: null, isAdmin: false }),
    }),
    {
      name: "user-store",
    }
  )
);
