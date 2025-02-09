import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getItem = async (itemId) => {
  // On cherche l'élément avec le champ `id` qui correspond à `itemId`
  const q = query(collection(db, "items"), where("id", "==", itemId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0]; // On prend le premier résultat
    return { id: docSnap.id, ...docSnap.data() };
  }

  return null; // Aucun élément trouvé
};
