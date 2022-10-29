import { addDoc, collection, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export async function saveSuggestion(suggestion) {
  const suggestionRef = collection(firestore, 'suggestions');
  await addDoc(suggestionRef, suggestion);
}
