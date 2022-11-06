<script setup lang="ts">
import { ref } from "vue";

// import component for hearoicons
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";

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
  <div class="w-full py-10 px-2 max-w-[850px] my-0 mx-auto sm:pt-[72px]">
    <div class="flex flex-col mt-40 items-center">
        <!-- Form Name -->
      <div>
        <h1
          class="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          Sign In
        </h1>
        <p class="mt-2 text-center text-sm text-slate-600 dark:text-slate-200">
            <p class="inline-block">
        Don't have an account yet?
        <RouterLink
          :to="{ name: 'home' }"
          class="text-violet-400 hover:text-violet-700 hover:underline"
          >Sign Up</RouterLink
        >
      </p>
        </p>
      </div>
      <form
        @submit.prevent="submitForm"
        method="post"
        class="flex flex-col gap-4 w-full space-y-6 mt-4"
      >
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

        <div class="space-y-8 rounded-md shadow-sm">
          <div class="relative">
            <input
              v-model="email"
              type="email"
              name="email"
              required
              id="email"
              class="block appearance-none w-full bg-transparent border-b border-x-0 border-t-0 focus:ring-0 focus:border-b-violet-600 peer"
            />
            <label
              for="email"
              class="absolute top-0 left-0 w-full h-full flex items-center pl-3 text-sm transition-all duration-300 peer-focus:-translate-y-full peer-focus:pl-0 peer-focus:text-xs peer-focus:mt-4"
              >Email Address</label
            >
          </div>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              required
              class="relative block appearance-none w-full bg-transparent border-b border-x-0 border-t-0 focus:ring-0 focus:border-b-violet-600 peer"
            />
            <label
              for="password"
              class="absolute top-0 left-0 w-full h-full flex items-center pl-3 text-sm transition-all duration-300 peer-focus:-translate-y-full peer-focus:pl-0 peer-focus:text-xs peer-focus:mt-4"
              >Password</label
            >
          </div>
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              class="rounded-[4px] bg-transparent appearance-none border-violet-600 focus:border-violet-600 checked:bg-violet-600 checked:ring-violet-600 w-5 h-5 focus:bg-violet-600 text-violet-300 ring-violet-600"
            />
            <label for="rememberMe" class="ml-2 block text-sm text-"
              >Remember me</label
            >
          </div>

          <button
            type="submit"
            class="group relative flex text-center items-center justify-center w-full bg-violet-600 hover:bg-violet-800 text-violet-300 hover:text-violet-200 rounded-md py-2 px-4 font-medium"
          >
            <span class="absolute insert-y-0 left-0 flex items-center pl-3"
              ><LockClosedIcon
                class="h-5 w-5 text-violet-400 group-hover:text-violet-200"
                aria-hidden="true"
            /></span>
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
