<script lang="ts">
export default {
  data() {
    return {
      mobile: null,
    };
  },
  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
};
</script>
<script setup lang="ts">
import { RouterView } from "vue-router";

// import components
import Navigation from "@/components/Navigation.vue";
import InvoiceModal from "@/components/InvoiceModal.vue";
</script>

<template>
  <div
    v-if="!mobile"
    class="flex bg-very-dark-purple min-h-screen flex-col sm:flex-row"
  >
    <!-- Navigation -->
    <Navigation />
    <!-- Content Div -->
    <div
      class="relative flex flex-col sm:flex-row min-h-screen py-0 px-5 flex-1"
    >
      <InvoiceModal />
      <RouterView />
    </div>
  </div>
  <div
    v-else
    class="flex flex-col justify-center items-center align-middle text-center h-screen bg-very-dark-purple text-gray-200"
  >
    <h2 class="font-bold text-xl">
      Sorry, this app is not supported on Mobile devices
    </h2>
    <p class="mt-4">To use this app, please use a computer or Tablet</p>
  </div>
</template>

<style></style>
