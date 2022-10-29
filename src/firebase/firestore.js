import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestore } from './firebase';

export async function saveSuggestion(suggestion) {
  const suggestionRef = collection(firestore, 'suggestions');
  await addDoc(suggestionRef, suggestion);
}

export async function fetchSuggestions(setSuggestions, setLoadingSuggestions) {
  const collectionQuery = query(
    collection(firestore, 'suggestions'),
    where('date', '!=', null),
    orderBy('date', 'desc')
  );
  const unsubscribe = onSnapshot(collectionQuery, snap => {
    const suggestions = [];
    for (const doc of snap.docs) {
      const suggestion = doc.data();
      suggestions.push({
        ...suggestion,
        id: doc.id,
      });
    }
    setSuggestions(suggestions);
    setLoadingSuggestions(false);
  });

  return unsubscribe;
}
