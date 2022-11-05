import { defineStore } from "pinia";

// import firebase needed composables
import useLogin from "@/composables/useLogin";
import useSignup from "@/composables/useSignup";
import getUser from "@/composables/getUser";

// import interfaces
import type { User } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as object | null,
  }),
  actions: {
    async loginUser(email: string, password: string) {
      this.user = await useLogin().loginUser(email, password);
    },
    async signupUser(email: string, password: string, displayName?: string) {
      if (displayName) {
        this.user = await useSignup().createUser(email, password, displayName);
      } else {
        this.user = await useSignup().createUser(email, password);
      }
    },
    getUser() {
      this.user = getUser();
    },
  },
});
