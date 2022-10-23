<script setup lang="ts">
import { ref } from "vue";

const filterMenu = ref(false);

const newInvoice = () => {};

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
        <span>There are 4 total invoices</span>
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
  </div>
</template>
