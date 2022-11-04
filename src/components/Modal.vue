<script setup lang="ts">
// import store for invoiceModal
import { useInvoiceModalStore } from "@/stores/invoiceModalStore";
import { useModalStore } from "@/stores/modelStore";

const invoiceModalStore = useInvoiceModalStore();
const modalStore = useModalStore();

const closeModal = () => {
  modalStore.toggleModal();
};

const closeInvoice = () => {
  modalStore.toggleModal();
  invoiceModalStore.toggleInvoice();
  if (invoiceModalStore.editInvoice) {
    invoiceModalStore.toggleEditInvoice();
  }
};
</script>

<template>
  <div class="flex z-[100] fixed justify-center items-center h-screen w-full">
    <div
      class="rounded-[20px] py-12 px-8 max-w-[450px] bg-dark-purple text-white"
    >
      <p class="text-center text-lg">
        Are you sure you want to exit?
        <span class="text-red block">Your changes will not be saved!</span>
      </p>
      <div class="flex mt-6">
        <button
          @click="closeModal"
          class="flex-1 py-4 px-6 rounded-[30px] border-none mr-2 text-white items-center justify-center bg-purple"
        >
          Return
        </button>
        <button
          @click="closeInvoice"
          class="flex-1 py-4 px-6 rounded-[30px] border-none mr-2 text-white items-center justify-center bg-red"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
