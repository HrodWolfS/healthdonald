import { db } from "@/lib/firebase";
import { deleteItem } from "@/lib/items/delete-item";
import { collection, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: {},

      // 🔥 Charger les items Firestore au démarrage
      fetchItems: async () => {
        const snapshot = await getDocs(collection(db, "items"));
        const fetchedItems = snapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          acc[data.id] = { quantity: 1, item: data }; // Ajout en tant que cart item
          return acc;
        }, {});
        set({ items: fetchedItems });
      },

      // 🔥 Ajouter un item au panier
      addItem: (item) => {
        set((state) => {
          const itemId = item.id;
          const existingItem = state.items[itemId];

          return {
            items: {
              ...state.items,
              [itemId]: {
                quantity: existingItem ? existingItem.quantity + 1 : 1,
                item,
              },
            },
          };
        });
      },

      // 🔥 Supprimer un item (Firestore + Panier)
      removeItem: async (itemId) => {
        await deleteItem(itemId); // Suppression dans Firestore
        set((state) => {
          const existingItem = state.items[itemId];

          if (!existingItem) return state; // L'élément n'existe pas

          const newQuantity = existingItem.quantity - 1;
          const newItems = { ...state.items };

          if (newQuantity > 0) {
            newItems[itemId] = {
              quantity: newQuantity,
              item: existingItem.item,
            };
          } else {
            delete newItems[itemId]; // Supprime complètement si quantité = 0
          }

          return { items: newItems };
        });
      },

      // 🔥 Vider le panier complètement
      clearCart: () => {
        set({ items: {} });
      },
    }),
    { name: "cart-store" }
  )
);

// 🔥 Retourne la quantité totale d'items dans le panier
export const useCartQuantity = () => {
  return useCartStore((s) =>
    Object.values(s.items).reduce((acc, curr) => acc + (curr.quantity || 0), 0)
  );
};

// 🔥 Retourne le prix total du panier
export const useCartTotalPrice = () => {
  return useCartStore((s) =>
    Object.values(s.items).reduce(
      (acc, curr) => acc + (curr.quantity || 0) * curr.item.price,
      0
    )
  );
};
