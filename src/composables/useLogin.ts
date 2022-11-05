import { ref } from "vue";

// import firebase stuff
import { auth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// define state
const isPending = ref<boolean>(false);
const error = ref<string | null>(null);

const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  error.value = null;
  isPending.value = true;

  try {
    if (!rememberMe) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Could not complete Sign In at this time");
      }
      error.value = null;
      isPending.value = false;
      return res;
    }
    await setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (!res) {
          throw new Error("Could not complete Sign In at this time");
        }
        isPending.value = false;
        error.value = null;
        return res;
      })
      .catch((err) => {
        error.value = err.message;
      });
  } catch (err: any) {
    switch (err.code) {
      case "auth/user-not-found":
        error.value =
          "There seems to not be an account with this information, please Sign Up";
        break;
      default:
        break;
    }
    isPending.value = false;
  }
};

// export the method that return all normal values
const useLogin = () => {
  return { error, isPending, loginUser };
};

export default useLogin;
