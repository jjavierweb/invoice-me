import { ref } from "vue";

// firebase imports
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser);

// check if the authentation state change
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
