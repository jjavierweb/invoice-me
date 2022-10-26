/**
 * This file will hold the interfaces definitions
 * that we will use through the project
 */

export interface InvoiceItemList {
  id: number;
  itemName: string;
  qty: number;
  price: number;
  total: number;
}
