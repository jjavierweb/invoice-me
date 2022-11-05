/**
 * This file will hold the interfaces definitions
 * that we will use through the project
 */

/**
 * Interface for Invoice Item List
 * Defines the object for the invoice
 * item
 */
export interface InvoiceItemList {
  id: string | null;
  itemName: string | null;
  qty: number | null;
  price: number | null;
  total: number | null;
}

// interface for invoice object
export interface Invoice {
  id?: string | null; // this is not present at the time of creation as it is assigned by firebase
  invoiceId: string | null;
  billerStreetAddress: string | null;
  billerCity: string | null;
  billerZipCode: string | null;
  billerCountry: string | null;
  clientName: string | null;
  clientEmail: string | null;
  clientStreetAddress: string | null;
  clientCity: string | null;
  clientZipCode: string | null;
  clientCountry: string | null;
  invoiceDateUnix: number | null;
  invoiceDate: string | null;
  paymentTerms: number | null;
  paymentDueDateUnix: number | null;
  paymentDueDate: string | null;
  productDescription: string | null;
  invoiceItemList: InvoiceItemList[] | [];
  invoiceTotal: number | null;
  invoicePending: boolean | null;
  invoiceDraft: boolean | null;
  invoicePaid: boolean | null;
}
