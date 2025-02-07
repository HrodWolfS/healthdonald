import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const uploadImage = async (file, itemId) => {
  if (!file) return null;

  const storageRef = ref(storage, `items/${itemId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export default uploadImage;
