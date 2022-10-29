// ACTIONS

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(image, uid) {
  const imageName = `${uid}${Date.now()}`;
  const storageRef = ref(storage, `osb/${uid}/${imageName}.jpg`);
  const snapshot = await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
