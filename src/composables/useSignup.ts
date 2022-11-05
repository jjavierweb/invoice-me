import { ref } from "vue";

// import firebase thinds
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// define states
const isPending = ref<boolean>(false);
const error = ref<string | boolean | null>(null);

const createUser = async (
  email: string,
  password: string,
  displayName?: string
) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("There was an error creating the user, please try again");
    }
    if (displayName) {
      await updateProfile(res.user, { displayName: displayName });
      error.value = null;
      isPending.value = false;
      return res;
    }
  } catch (err: any) {
    if (
      err.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      error.value = "The password needs to be at least 6 characters long";
    }
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, isPending, createUser };
};

export default useSignup;
