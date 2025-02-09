import { CATEGORIES } from "@/lib/categories-data";
import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  currentCategory: CATEGORIES[0].id,
  setCurrentCategory: (id) => set({ currentCategory: id }),
}));
