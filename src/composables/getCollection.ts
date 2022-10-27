import { ref, watchEffect } from "vue";

// import required firebase
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  orderBy,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

const getCollection = (collectionName: string) => {
  const documents = ref<object[]>(null);

  const colRef = query(collection(db, collectionName));

  const unsub = onSnapshot(colRef, (snap) => {
    let results: object[] = [];
    snap.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
