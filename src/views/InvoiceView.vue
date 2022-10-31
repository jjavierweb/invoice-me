<script setup lang="ts">
//import vue and pinia stuff
import { storeToRefs } from "pinia";
import { useRoute, RouterLink } from "vue-router";

// import types
import type { Invoice } from "@/types/interfaces";

// import store
import { useInvoiceStore } from "@/stores/invoiceStore";

// define store
const invoiceStore = useInvoiceStore();

// set store state to ref
const { currentInvoiceArray } = storeToRefs(invoiceStore);

// define router object
const route = useRoute();

// define variables
let currentInvoice: Invoice | null = null;

// call action to get current invoice
invoiceStore.setCurrentInvoice(route.params.id);
currentInvoice = currentInvoiceArray.value[0]; // cleanup for the markup
</script>

<template>
  <div
    v-if="currentInvoice"
    class="container py-10 px-[10px] my-0 mx-auto sm:pt-[72px]"
  >
    <RouterLink class="nav-link flex" :to="{ name: 'home' }">
      <img src="@/assets/images/icon-arrow-left.svg" alt="" /> Go Back
    </RouterLink>
    <div class="flex">
      <!-- LEFT -->
      <div class="flex"></div>
      <!-- RIGHT -->
      <div class="flex"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
