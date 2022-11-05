import { defineStore } from "pinia";

export const useInvoiceModalStore = defineStore("invoiceModal", {
  state: () => ({
    invoiceModal: null as boolean | null,
    editInvoice: null as boolean | null,
  }),
  actions: {
    toggleInvoice() {
      this.invoiceModal = !this.invoiceModal;
    },
    toggleEditInvoice() {
      this.editInvoice = !this.editInvoice;
    },
  },
});
