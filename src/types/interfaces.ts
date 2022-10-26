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
