import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getItems = async (categoryId) => {
  const itemsCollection = collection(db, "items");
  // Filtrer sur le champ 'category' qui doit correspondre à categoryId
  const q = query(itemsCollection, where("category", "==", categoryId));
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};
