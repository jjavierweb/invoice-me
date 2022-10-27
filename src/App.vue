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
import { computed } from "vue";

// import components
import Navigation from "@/components/Navigation.vue";
import InvoiceModal from "@/components/InvoiceModal.vue";
import Modal from "@/components/Modal.vue";
import Loading from "./components/Loading.vue";

// import stores
import { useInvoiceModalStore } from "@/stores/invoiceModalStore";
import { useModalStore } from "@/stores/modelStore";
import { useInvoiceStore } from "@/stores/invoiceStore";
import { storeToRefs } from "pinia";

// define the store
const invoiceModalStore = useInvoiceModalStore();
const modalStore = useModalStore();
const invoiceStore = useInvoiceStore();
const { invoiceData, invoicesLoaded } = storeToRefs(invoiceStore);

// on create load invoices
invoiceStore.getInvoices();

// computed property to toggle invoice form
const invoiceModal = computed(() => {
  return invoiceModalStore.$state.invoiceModal;
});

const modalActive = computed(() => {
  return modalStore.$state.modalActive;
});
</script>

<template>
  <div v-if="invoicesLoaded">
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
        <Modal v-if="modalActive" />
        <transition
          name="invoice"
          enter-active-class="transition-all ease-in duration-200"
          enter-from-class="translate-x-[-700px]"
          leave-active-class="transtion-all duration-200"
          leave-to-class="translate-x-[-700px]"
        >
          <InvoiceModal v-if="invoiceModal" />
        </transition>
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
  </div>
  <Loading v-else>Loading data...</Loading>
</template>

<style></style>
