import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import uploadImage from "./uploadImage";

export const setItem = async (item, id) => {
  if (item.image && typeof item.image !== "string") {
    const imageUrl = await uploadImage(item.image, id);
    item = { ...item, image: imageUrl };
  }

  const fileRef = doc(db, "items", id);
  await setDoc(fileRef, item);
};
