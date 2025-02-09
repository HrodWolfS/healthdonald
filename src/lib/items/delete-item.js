import {
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const deleteItem = async (itemId) => {
  try {
    // Étape 1 : Trouver le bon document en fonction du champ `id`
    const q = query(collection(db, "items"), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Aucun élément trouvé avec cet ID :", itemId);
      return;
    }

    // Suppression de chaque document trouvé (normalement, il ne devrait y en avoir qu'un)
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "items", docSnap.id));
      console.log("Élément supprimé :", docSnap.id);
    });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};
