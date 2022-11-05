<script setup lang="ts">
import { ref } from "vue";

// import composable for login
import useLogin from "@/composables/useLogin";
// import store
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

//define login composable
const { error, isPending, loginUser } = useLogin();

// define store
const userStore = useUserStore();

// define router
const router = useRouter();

// create reference for email and password
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const submitForm = async () => {
  await loginUser(email.value, password.value, rememberMe.value);
  if (!error.value) {
    router.push({ name: "home" });
  }
};
</script>

<template>
  <div class="w-full py-10 px-[10px] max-w-[850px] my-0 mx-auto sm:pt-[72px]">
    <div class="flex flex-col mt-40 items-center">
      <form
        @submit.prevent="submitForm"
        method="post"
        class="flex flex-col gap-4 w-full"
      >
        <h1 class="text-center text-4xl font-semibold">Sign In</h1>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="error"
            class="bg-rose-500 my-1 text-rose-200 p-2 mb-3 rounded-md block w-full text-center"
          >
            {{ error }}
          </div>
        </transition>

        <div class="space-y-5 rounded-md shadow-sm">
          <div>
            <input
              v-model="email"
              type="email"
              name="email"
              required
              placeholder="Email Address"
              id="email"
              class="relative block appearance-none w-full bg-transparent border-b border-x-0 border-t-0 focus:ring-0 focus:border-b-violet-600"
            />
            <label for="email" class="sr-only">Email Address</label>
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              required
              class="relative block appearance-none w-full bg-transparent border-b border-x-0 border-t-0 focus:ring-0 focus:border-b-violet-600"
            />
            <label for="password" class="sr-only">Password</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              class="rounded-[4px] bg-transparent appearance-none border-violet-600 focus:border-violet-600 checked:bg-violet-600 w-5 h-5 focus:bg-violet-600 text-violet-300"
            />
            <label for="rememberMe" class="ml-2 block text-sm"
              >Remember me</label
            >
          </div>
          <button
            type="submit"
            class="w-full bg-violet-600 p-2 hover:bg-violet-800 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
