import { defineStore } from "pinia";

// import firebase getCollecion
import getCollection from "@/composables/getCollection";
import { db } from "@/firebase/config";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { watchEffect } from "vue";

// import interface
import type { Invoice } from "@/types/interfaces";

// create the store
export const useInvoiceStore = defineStore("invoiceStore", {
  state: () => ({
    invoiceData: [] as Invoice[],
    invoicesLoaded: null as boolean | null,
  }),
  actions: {
    getInvoices() {
      // get all data from firebase
      const q = query(collection(db, "invoices"));
      // confirm there are no duplicats on current and retrived data
      const unsub = onSnapshot(q, (snap) => {
        snap.docs.forEach((doc) => {
          if (!this.invoiceData.some((invoice) => invoice.id === doc.id)) {
            const data: Invoice = {
              id: doc.id,
              invoiceId: doc.data().invoiceId,
              billerStreetAddress: doc.data().billerStreetAddress,
              billerCity: doc.data().billerCity,
              billerZipCode: doc.data().billerZipCode,
              billerCountry: doc.data().billerCountry,
              clientName: doc.data().clientName,
              clientEmail: doc.data().clientEmail,
              clientStreetAddress: doc.data().clientStreetAddress,
              clientCity: doc.data().clientCity,
              clientZipCode: doc.data().clientZipCode,
              clientCountry: doc.data().clientCountry,
              invoiceDateUnix: doc.data().invoiceDateUnix,
              invoiceDate: doc.data().invoiceDate,
              paymentTerms: doc.data().paymentTerms,
              paymentDueDateUnix: doc.data().paymentDueDateUnix,
              paymentDueDate: doc.data().paymentDueDate,
              productDescription: doc.data().productDescription,
              invoiceItemList: doc.data().invoiceItemList,
              invoiceTotal: doc.data().invoiceTotal,
              invoicePending: doc.data().invoicePending,
              invoiceDraft: doc.data().invoiceDraft,
              invoicePaid: doc.data().invoicePaid,
            };
            this.SET_INVOICE_DATA(data);
          }
        });
        this.INVOICES_LOADED();
      });
      watchEffect((onInvalidate) => {
        onInvalidate(() => unsub);
      });
    },
    SET_INVOICE_DATA(payload: Invoice) {
      this.invoiceData.push(payload);
    },
    INVOICES_LOADED() {
      this.invoicesLoaded = true;
    },
  },
});
