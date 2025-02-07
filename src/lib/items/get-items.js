import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getItems = async () => {
  const docRef = collection(db, "items");

  const docSnap = await getDocs(docRef);

  const data = [];
  docSnap.forEach((d) => {
    data.push({
      id: d.id,
      ...d.data(),
    });
  });

  return data;
};
