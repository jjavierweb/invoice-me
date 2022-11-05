//import ref from vue
import { ref } from "vue";

// import firebase db configuraiton
import { db } from "@/firebase/config";

// import firebase required items
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import type { Invoice } from "@/types/interfaces";

// create method to use
const useCollection = (collectionName: string) => {
  const error = ref<boolean | null>(null);
  const isPending = ref<boolean | null>(null);

  const addDocument = async (doc: Invoice) => {
    error.value = false;
    isPending.value = true;
    try {
      const res = await addDoc(collection(db, collectionName), doc);
      if (!res) {
        throw new Error(
          "There was an error trying to create the document, please try again"
        );
      }
      error.value = false;
      isPending.value = false;
      return res;
    } catch (err: any) {
      isPending.value = false;
      error.value = err.message;
    }
  };

  // update document
  const updateCurrentDoc = async (docId: string, updatedInfo: Invoice) => {
    isPending.value = true;
    error.value = false;
    const docRef = doc(db, collectionName, docId);
    try {
      await updateDoc(docRef, { ...updatedInfo });
      isPending.value = false;
      error.value = false;
    } catch (err: any) {
      error.value = true;
      error.value = err.message;
      console.log(err);
      isPending.value = false;
    }
  };
  // delete document from collection
  const deleteDocument = async (docId: string) => {
    // create document reference
    const docRef = doc(db, collectionName, docId);
    try {
      isPending.value = true;
      error.value = false;
      await deleteDoc(docRef);
    } catch (err: any) {
      isPending.value = false;
      error.value = err.message;
    }
  };

  // return variables and methods
  return { error, isPending, addDocument, updateCurrentDoc, deleteDocument };
};

export default useCollection;
