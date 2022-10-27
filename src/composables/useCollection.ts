//import ref from vue
import { ref } from "vue";

// import firebase db configuraiton
import { db } from "@/firebase/config";

// import firebase required items
import { collection, addDoc } from "firebase/firestore";

// create method to use
const useCollection = (collectionName: string) => {
  const error = ref<boolean | null>(null);
  const isPending = ref<boolean | null>(null);

  const addDocument = async (doc: object) => {
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
  return { error, isPending, addDocument };
};

export default useCollection;
