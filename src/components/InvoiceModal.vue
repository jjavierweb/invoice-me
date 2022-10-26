<script setup lang="ts">
import { ref } from "vue";

// variables for inputs
const billerStreetAddress = ref(null);
const billerCity = ref(null);
const billerZipCode = ref(null);
const billerCountry = ref(null);
const clientName = ref(null);
const clientEmail = ref(null);
const clientStreetAddress = ref(null);
const clientCity = ref(null);
const clientZipCode = ref(null);
const clientCountry = ref(null);
const invoiceDateUnix = ref(null);
const invoiceDate = ref(null);
const paymentTerms = ref(null);
const paymentDueDateUnix = ref(null);
const paymentDueDate = ref(null);
const productDescription = ref(null);
const invoicePending = ref(null);
const invoiceDraft = ref(null);
const invoiceItemList = ref<
  [{ id: number; itemName: string; qty: number; price: number; total: number }]
>([{ id: 0, itemName: "", qty: 0, price: 0, total: 0 }]);
const invoiceTotal = ref<number>(0);

const check = () => {};
const submitForm = () => {};
const deleteInvoiceItem = (id: number) => {};
const addNewInvoiceItem = () => {};
const closeInvoice = () => {};
const saveDraft = () => {};
const publishInvoice = () => {};
</script>

<template>
  <div
    @click="check"
    class="fixed top-0 left-0 w-full h-screen overflow-scroll sm:left-[90px] flex flex-col"
    ref="invoiceWrap"
  >
    <form
      @submit.prevent="submitForm"
      class="relative p-[56px] max-w-[700px] w-full bg-very-dark-purple text-white shadow-md shadow-slate-800/80"
    >
      <h1 class="text-2xl mb-12 font-bold">New Invoice</h1>

      <!-- Bill From Section -->
      <div class="flex flex-col mb-12">
        <h4 class="mb-6 text-purple text-sm">Bill From:</h4>
        <div class="mb-6 flex flex-col">
          <label for="billerStreetAddress" class="text-xs mb-[6px]"
            >Street Address</label
          >
          <input
            type="text"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
            required
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>
        <div class="flex gap-4">
          <div class="mb-6 flex flex-col">
            <label for="billerCity" class="text-xs mb-[6px]">City</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="billerCity"
              v-model="billerCity"
            />
          </div>
          <div class="mb-6 flex flex-col">
            <label for="billerCountry" class="text-xs mb-[6px]">Country</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
          <div class="mb-6 flex flex-col">
            <label for="billerZipCode" class="text-xs mb-[6px]">Zip Code</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>
        </div>
      </div>

      <!-- Bill To Section -->
      <div class="flex flex-col mb-12">
        <h4 class="mb-6 text-purple text-sm">Bill To:</h4>
        <div class="flex flex-col mb-6">
          <label for="clientName" class="text-xs mb-[6px]">Client Name</label>
          <input
            required
            type="text"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
            id="clientName"
            v-model="clientName"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="clientEmail" class="text-xs mb-[6px]">Client Email</label>
          <input
            required
            type="text"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
            id="clientEmail"
            v-model="clientEmail"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="clientStreetAddress" class="text-xs mb-[6px]"
            >Street Address</label
          >
          <input
            required
            type="text"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>
        <div class="flex gap-4">
          <div class="mb-6 flex flex-col">
            <label for="clientCity" class="text-xs mb-[6px]">City</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="clientCity"
              v-model="clientCity"
            />
          </div>
          <div class="mb-6 flex flex-col">
            <label for="clientCountry" class="text-xs mb-[6px]">Country</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
          <div class="mb-6 flex flex-col">
            <label for="clientZipCode" class="text-xs mb-[6px]">Zip Code</label>
            <input
              type="text"
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              required
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="flex flex-col">
        <h4 class="mb-6 text-purple text-sm">Invoice Work Details:</h4>
        <div class="flex gap-6">
          <div class="flex flex-1 mb-6 flex-col">
            <label class="text-xs mb-[6px]" for="invoiceDate"
              >Invoice Date</label
            >
            <input
              disabled
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="flex flex-1 mb-6 flex-col">
            <label class="text-xs mb-[6px]" for="paymentDueDate"
              >Payment Due</label
            >
            <input
              disabled
              class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="mb-6 flex flex-col">
          <label for="paymentTerms" class="text-xs mb-[6px]"
            >Payment Terms</label
          >
          <select
            required
            name="paymentTerms"
            id="paymentTerms"
            v-model="paymentTerms"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
          >
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="mb-6 flex flex-col">
          <label for="productDescription" class="text-xs mb-[6px]"
            >Product Description</label
          >
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
            class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
          />
        </div>

        <!-- Work Items -->
        <div>
          <h3 class="mb-4 text-[18px] text-dark-gray">Items List</h3>
          <table class="w-full">
            <tr class="flex gap-4 text-xs mb-4">
              <th class="basis-1/2 text-left">Item Name</th>
              <th class="basis-[10%] text-left">Qty</th>
              <th class="basis-[20%] text-left">Price</th>
              <th class="basis-[20%] text-left self-center">Total</th>
            </tr>
            <tr
              class="flex relative gap-4 text-sm mb-4 justify-center align-middle items-center"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="basis-1/2">
                <input
                  type="text"
                  v-model="item.itemName"
                  class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
                />
              </td>
              <td class="basis-[10%] text-left">
                <input
                  type="text"
                  v-model="item.qty"
                  class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
                />
              </td>
              <td class="basis-[20%] text-left">
                <input
                  type="text"
                  v-model="item.price"
                  class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
                />
              </td>
              <td class="basis-[20%] text-left self-center">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <img
                @click="deleteInvoiceItem(item.id)"
                class="w-3 h-4 cursor-pointer"
                src="@/assets/images/icon-delete.svg"
                alt="delete item icon"
              />
            </tr>
          </table>
          <div
            @click="addNewInvoiceItem"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 bg-dark-purple items-center justify-center w-full cursor-pointer hover:shadow-sm hover:shadow-slate-800 hover:text-white"
          >
            <div class="flex rounded-full p-2 items-center justify-center peer">
              <img
                src="@/assets/images/icon-plus.svg"
                alt="Add Icon"
                class="mr-1 w-[10px] h-[10px]"
              />
            </div>
            <span class="text-sm">Add New Item</span>
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="flex mt-[60px]">
        <div class="flex flex-1">
          <button
            @click="closeInvoice"
            class="bg-red flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center"
          >
            Cancel
          </button>
        </div>
        <div class="flex justify-end">
          <button
            @click="saveDraft"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center bg-dark-purple"
          >
            Save Draft
          </button>
          <button
            @click="publishInvoice"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center bg-purple"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>