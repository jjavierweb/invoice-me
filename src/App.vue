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

<style lang="scss">
.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;
  p {
    margin-top: 16px;
  }
}
// animated invoice
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}
.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}
button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
