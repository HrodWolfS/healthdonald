import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import uploadImage from "./uploadImage";

export const updateItem = async (item, itemId) => {
  // 1️⃣ Récupérer le bon document Firestore
  const q = query(collection(db, "items"), where("id", "==", itemId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("❌ L'item n'existe pas dans Firestore.");
  }

  const docSnap = querySnapshot.docs[0]; // Prendre le premier document trouvé
  const docRef = doc(db, "items", docSnap.id); // ID réel Firestore

  // 2️⃣ Uploader l’image uniquement si elle est nouvelle
  let updatedItem = { ...item };
  if (item.image && typeof item.image !== "string") {
    const imageUrl = await uploadImage(item.image, itemId);
    updatedItem.image = imageUrl;
  }

  // 3️⃣ Mettre à jour le document dans Firestore
  await updateDoc(docRef, updatedItem);
};
