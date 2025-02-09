import { create } from "zustand";

export const useModifyStore = create((set) => ({
  toggleModify: false,
  setToggleModify: (value) => set({ toggleModify: value }),
}));
