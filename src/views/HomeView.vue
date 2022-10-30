<script setup lang="ts">
import { ref } from "vue";

// import stores
import { useInvoiceModalStore } from "@/stores/invoiceModalStore";
import { useInvoiceStore } from "@/stores/invoiceStore";

// import components
import Invoice from "@/components/Invoice.vue";
import { storeToRefs } from "pinia";

// define stores
const invoiceModalStore = useInvoiceModalStore();
const invoiceStore = useInvoiceStore();
const { invoiceData } = storeToRefs(invoiceStore);

const filterMenu = ref(false);

const newInvoice = () => {
  invoiceModalStore.toggleInvoice();
};

//funciton to toggle filter
const toggleFilterMenu = () => {
  filterMenu.value = !filterMenu.value;
};
</script>

<template>
  <div class="w-full py-10 px-[10px] max-w-[850px] my-0 mx-auto sm:pt-[72px]">
    <!-- Header -->
    <div class="flex mb-[65px]">
      <!-- Left child -->
      <div class="flex flex-col flex-1">
        <h1 class="text-5xl">Invoices</h1>
        <span>There are {{ invoiceData.length }} total invoices</span>
      </div>
      <!-- Right child -->
      <div class="flex flex-1 justify-end items-center">
        <!-- Filter-->
        <div
          @click="toggleFilterMenu"
          class="relative flex mr-10 items-center cursor-pointer"
        >
          <span class="text-sm">Filter by status</span>
          <img
            src="@/assets/images/icon-arrow-down.svg"
            alt=""
            class="ml-3 w-[9px] h-[5px]"
          />
          <ul
            v-show="filterMenu"
            class="w-[120px] absolute top-[25px] list-none bg-very-dark-purple shadow-md shadow-slate-800/60"
          >
            <li
              class="cursor-pointer text-xs px-[10px] py-[20px] hover:bg-slate-300 hover:text-very-dark-purple"
            >
              Draft
            </li>
            <li
              class="cursor-pointer text-xs px-[10px] py-[20px] hover:text-very-dark-purple hover:bg-slate-300"
            >
              Pending
            </li>
            <li
              class="cursor-pointer text-xs px-[10px] py-[20px] hover:text-very-dark-purple hover:bg-slate-300"
            >
              Paid
            </li>
            <li
              class="cursor-pointer text-xs px-[10px] py-[20px] hover:text-very-dark-purple hover:bg-slate-300"
            >
              Clear Filter
            </li>
          </ul>
        </div>
        <!-- Add button -->
        <div
          @click="newInvoice"
          class="flex items-center bg-purple rounded-[40px] py-2 px-[10px] cursor-pointer"
        >
          <div
            class="flex mr-2 rounded-full p-2 items-center justify-center bg-white"
          >
            <img
              src="@/assets/images/icon-plus.svg"
              alt=""
              class="w-[10px] h-[10px]"
            />
          </div>
          <span class="text-sm">New Invoice</span>
        </div>
      </div>
    </div>
    <!-- Invoices -->
    <div v-if="invoiceData.length > 0">
      <Invoice
        v-for="invoice in invoiceData"
        :key="invoice.id"
        :invoice="invoice"
      />
    </div>
    <div v-else class="flex flex-col mt-40 items-center">
      <img
        src="@/assets/images/illustration-empty.svg"
        alt="image of empty"
        class="w-[214px] h-[200px]"
      />
      <h3 class="text-xl mt-10 font-semibold">There is nothing here</h3>
      <p class="text-center max-w-[220px] text-xs font-light mt-4">
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </div>
</template>
