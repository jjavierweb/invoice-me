<script setup lang="ts">
//import vue and pinia stuff
import { storeToRefs } from "pinia";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { ref, watch } from "vue";

// import types
import type { Invoice } from "@/types/interfaces";

// import store
import { useInvoiceStore } from "@/stores/invoiceStore";
import { useInvoiceModalStore } from "@/stores/invoiceModalStore";

// define store
const invoiceStore = useInvoiceStore();
const invoiceModalStore = useInvoiceModalStore();

// set store state to ref
const { currentInvoiceArray } = storeToRefs(invoiceStore);
const { editInvoice } = storeToRefs(invoiceModalStore);

// define router object
const route = useRoute();
const router = useRouter();

// define variables
let currentInvoice = ref<Invoice | null>(null);

// call action to get current invoice
invoiceStore.setCurrentInvoice(route.params.id);
currentInvoice.value = currentInvoiceArray.value[0]; // cleanup for the markup

// Methods for this view
const toggleEditInvoice = () => {
  invoiceModalStore.toggleEditInvoice();
  invoiceModalStore.toggleInvoice();
};
const deleteInvoice = async (docId: string, routeId: string) => {
  await invoiceStore.deleleteInvoice(docId, routeId);
  router.push({ name: "home" });
};
watch(editInvoice, () => {
  if (!editInvoice.value) {
    currentInvoice.value = currentInvoiceArray.value[0];
  }
});
</script>

<template>
  <div
    v-if="currentInvoice"
    class="w-full py-10 px-[10px] max-w-[850px] sm:pt-[72px] my-0 mx-auto"
  >
    <RouterLink
      class="flex mb-8 items-center text-white text-xs"
      :to="{ name: 'home' }"
    >
      <img
        src="@/assets/images/icon-arrow-left.svg"
        alt=""
        class="mr-4 w-[7px] h-[10px]"
      />
      Go Back
    </RouterLink>
    <!-- HEADER -->
    <div
      class="flex bg-weird-purple rounded-[20px] items-center py-6 px-8 text-xs"
    >
      <!-- LEFT -->
      <div class="flex items-center">
        <span class="text-lavender mr-4">Status</span>
        <!-- Status buttons -->
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <!-- RIGHT -->
      <div class="flex flex-1 justify-end">
        <button
          class="bg-purple py-4 px-6 hover:bg-[#5741af] text-white"
          @click="toggleEditInvoice"
        >
          Edit
        </button>
        <button
          @click="deleteInvoice(currentInvoice.invoiceId, currentInvoice.id)"
          class="bg-red py-4 px-6 ml-2 hover:bg-[#bd4646] text-white"
        >
          Delete
        </button>
        <button
          class="bg-green py-4 px-6 ml-2 hover:bg-[#29ab7f] text-white"
          v-if="currentInvoice.invoicePending"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          class="bg-orange py-4 px-6 ml-2 text-white"
        >
          Mark as Pending
        </button>
      </div>
    </div>
    <!-- Invoice Details -->
    <div class="flex flex-col bg-weird-purple rounded-[20px] p-12 mt-6">
      <!-- TOP -->
      <div class="flex text-lavender">
        <!-- LEFT -->
        <div class="flex flex-col text-xs">
          <p class="text-2xl uppercase text-white mb-2">
            <span class="text-[#888eb0]">#</span>{{ currentInvoice.invoiceId }}
          </p>
          <p class="text-base">{{ currentInvoice.productDescription }}</p>
        </div>
        <!-- RIGHT -->
        <div class="flex flex-col flex-1 text-xs items-end">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <!-- MIDDLE -->
      <div class="flex mt-[50px] text-lavender gap-4">
        <!-- Payment Section -->
        <div class="flex flex-col flex-1">
          <h4 class="text-xs font-normal mb-3">Invoice Date:</h4>
          <p class="text-base font-semibold">
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="text-xs font-normal mb-3 mt-8">Payment Date:</h4>
          <p class="text-base font-semibold">
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <!-- Bill To Section -->
        <div class="flex flex-col flex-1">
          <h4 class="text-xs font-normal mb-3">Bill To:</h4>
          <p class="text-base">{{ currentInvoice.clientName }}</p>
          <p class="text-xs mt-auto">
            {{ currentInvoice.clientStreetAddress }}
          </p>
          <p class="text-xs">{{ currentInvoice.clientCity }}</p>
          <p class="text-xs">{{ currentInvoice.clientZipCode }}</p>
          <p class="text-xs">{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="flex flex-col flex-2">
          <h4 class="text-xs font-normal mb-3">Send to:</h4>
          <p class="text-base">{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <!-- FOOTER -->
      <div class="flex flex-col mt-[50px]">
        <div class="p-8 rounded-t-[20px] bg-dark-purple">
          <div class="flex text-lavender text-xs mb-8">
            <p class="flex-3 text-left">Item Name:</p>
            <p class="flex-1 text-right">QTY</p>
            <p class="flex-1 text-right">Price</p>
            <p class="flex-1 text-right">Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="flex mb-8 text-[13px] text-white last:mb-0"
          >
            <p class="flex-3 text-left">{{ item.itemName }}</p>
            <p class="flex-1 text-right">{{ item.qty }}</p>
            <p class="flex-1 text-right">$ {{ item.price }}</p>
            <p class="flex-1 text-right">$ {{ item.total }}</p>
          </div>
        </div>
        <div
          class="flex text-white p-8 bg-very-dark-purple items-center rounded-b-[20px]"
        >
          <p class="flex-1 text-xs">Amount Due:</p>
          <p class="flex-1 text-2xl text-right">
            $ {{ currentInvoice.invoiceTotal }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
