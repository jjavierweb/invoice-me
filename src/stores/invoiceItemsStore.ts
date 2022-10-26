import { defineStore } from "pinia";
import { uid } from "uid";

// Import interfaces
import type { InvoiceItemList } from "@/types/interfaces";

export const useInvoiceItemListStore = defineStore("invoiceItemList", {
  state: () => ({
    invoiceItemList: [] as InvoiceItemList[],
  }),
  actions: {
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: null,
        price: null,
        total: null,
      });
    },
    deleteInvoiceItem(id: string) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },
    resetItemsStore() {
      this.invoiceItemList = [];
    },
  },
});
