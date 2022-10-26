import { defineStore } from "pinia";

export const useInvoiceModalStore = defineStore("invoiceModal", {
  state: () => ({
    invoiceModal: null,
  }),
  actions: {
    toggleInvoice() {
      this.invoiceModal = !this.invoiceModal;
    },
  },
});
