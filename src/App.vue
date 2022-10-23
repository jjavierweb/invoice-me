<script setup lang="ts">
import { RouterView } from "vue-router";

// import components
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="flex bg-[#141625] min-h-screen flex-col sm:flex-row">
    <Navigation />
    <div
      class="flex flex-col sm:flex-row min-h-screen pt-0 pb-0 pl-5 pr-5 flex-1"
    ></div>
  </div>

  <RouterView />
</template>

<style></style>
