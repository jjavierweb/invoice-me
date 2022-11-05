import { defineStore } from "pinia";

// import other stores
import { useInvoiceModalStore } from "./invoiceModalStore";

// import firebase getCollecion
import useCollection from "@/composables/useCollection";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

// import interface
import type { Invoice } from "@/types/interfaces";
const { deleteDocument, updateCurrentDoc } = useCollection("invoices");

// create the store
export const useInvoiceStore = defineStore("invoiceStore", {
  state: () => ({
    invoiceData: [] as Invoice[],
    invoicesLoaded: null as boolean | null,
    currentInvoiceArray: null as Invoice[] | null,
  }),
  actions: {
    //define store
    async getInvoices() {
      // get all data from firebase

      // confirm there are no duplicats on current and retrived data
      const snap = await getDocs(collection(db, "invoices"));
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
          this.invoiceData.push(data);
        }
        this.invoicesLoaded = true;
      });
    },
    setCurrentInvoice(payload: string | string[]) {
      this.currentInvoiceArray = this.invoiceData.filter((invoice: Invoice) => {
        return invoice.id === payload;
      });
    },
    // return array of invoices that id is not equal to requested
    removeInvoice(payload: string | string[]) {
      this.invoiceData = this.invoiceData.filter((invoice: Invoice) => {
        return invoice.invoiceId !== payload;
      });
    },
    // perform the update of the invoice before sending it to firebase
    async updateInvoice(docId: string, routeId: string) {
      this.removeInvoice(docId);
      await this.getInvoices();
      // toggle invoice modal
      useInvoiceModalStore().toggleInvoice();
      useInvoiceModalStore().toggleEditInvoice();
      // set current invoice
      this.setCurrentInvoice(routeId);
    },
    // delete item from store and firebase
    async deleleteInvoice(docId: string, routeId: string) {
      await deleteDocument(routeId);
      this.removeInvoice(docId);
    },
    // mutation to update status
    // mutation to update status to pending
    async updateStatusToPending(id: string) {
      this.invoiceData.forEach((invoice: Invoice) => {
        if (invoice.id === id) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      });
      // call the update method for the backend
      await updateCurrentDoc(id, {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      });
    },
    async updateStatusToPaid(id: string) {
      // update frontend
      this.invoiceData.forEach((invoice: Invoice) => {
        if (invoice.id === id) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      });
      // update backend
      await updateCurrentDoc(id, { invoicePaid: true, invoicePending: false });
    },
  },
});
