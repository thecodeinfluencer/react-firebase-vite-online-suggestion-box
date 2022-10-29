// ACTIONS

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(image, uid) {
  const imageName = `${uid}${Date.now()}`;
  const bucket = `osb/${uid}/${imageName}.png`;
  const storageRef = ref(storage, bucket);
  const snapshot = await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
