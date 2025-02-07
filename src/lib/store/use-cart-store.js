import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCartStore = create(
  persist(
    (set) => ({
      // { "brocoli-id": {quantity: 4, item: ...} }
      items: {},
      addItem: (item) => {
        set((state) => {
          const itemId = item.id;
          if (!state.items[itemId]) {
            state.items[itemId] = { quantity: 1, item };
          } else {
            state.items[itemId] = {
              quantity: state.items[itemId].quantity + 1,
              item,
            };
          }
          return {
            items: { ...state.items },
          };
        });
      },
      removeItem: (item) => {
        set((state) => {
          const itemId = item.id;
          if (state.items[itemId]) {
            state.items[itemId] = {
              quantity: state.items[itemId].quantity - 1,
              item,
            };
          }
          return {
            items: { ...state.items },
          };
        });
      },
    }),
    {
      name: "cart-store",
    }
  )
);
export const useCartQuantity = () => {
  return useCartStore((s) => {
    return Object.values(s.items).reduce((acc, curr) => {
      if (!curr.quantity) return acc;
      return acc + curr.quantity;
    }, 0);
  });
};

export const useCartTotalPrice = () => {
  return useCartStore((s) => {
    return Object.values(s.items).reduce((acc, curr) => {
      if (!curr.quantity) return acc;
      return acc + curr.quantity * curr.item.price;
    }, 0);
  });
};
