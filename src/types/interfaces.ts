/**
 * This file will hold the interfaces definitions
 * that we will use through the project
 */

export interface InvoiceItemList {
  id: string | null;
  itemName: string | null;
  qty: number | null;
  price: number | null;
  total: number | null;
}
