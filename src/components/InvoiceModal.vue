<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { uid } from "uid";

// import components
import Loading from "@/components/Loading.vue";

// import store
import { useInvoiceModalStore } from "@/stores/invoiceModalStore";
import { useInvoiceItemListStore } from "@/stores/invoiceItemsStore";
import { useModalStore } from "@/stores/modelStore";
import { useInvoiceStore } from "@/stores/invoiceStore";

// import firebase related requirements
import useCollection from "@/composables/useCollection";
import type { Invoice } from "@/types/interfaces";

//define store
const invoiceModalStore = useInvoiceModalStore();
const invoiceItemListStore = useInvoiceItemListStore();
const modalStore = useModalStore();
const invoiceStore = useInvoiceStore();

// import store values and actions
const { invoiceItemList } = storeToRefs(invoiceItemListStore);
const { editInvoice } = storeToRefs(invoiceModalStore);
const { addNewInvoiceItem, deleteInvoiceItem } = useInvoiceItemListStore();
const { currentInvoiceArray } = storeToRefs(invoiceStore);

// extract firebase composable to add a document
const { error, isPending, addDocument, updateCurrentDoc } =
  useCollection("invoices");

// variables for inputs
const invoiceId = ref<string | null>(null);
const billerStreetAddress = ref<string | null>(null);
const billerCity = ref<string | null>(null);
const billerZipCode = ref<string | null>(null);
const billerCountry = ref<string | null>(null);
const clientName = ref<string | null>(null);
const clientEmail = ref<string | null>(null);
const clientStreetAddress = ref<string | null>(null);
const clientCity = ref<string | null>(null);
const clientZipCode = ref<string | null>(null);
const clientCountry = ref<string | null>(null);
const invoiceDateUnix = ref<number | null>(null);
const invoiceDate = ref<string | null>(null);
const paymentTerms = ref<number | null>(null);
const paymentDueDateUnix = ref<number | null>(null);
const paymentDueDate = ref<string | null>(null);
const productDescription = ref<string | null>(null);
const invoicePending = ref<boolean | null>(null);
const invoiceDraft = ref<boolean | null>(null);
const invoiceTotal = ref<number | null>(null);
const invoicePaid = ref<boolean | null>(null);
const dateOptions = ref<object | null>({
  year: "numeric",
  month: "short",
  day: "numeric",
});
const invoiceWrap = ref<HTMLElement | null>(null);

// setup the invoice Date to current date
if (!editInvoice.value) {
  invoiceDateUnix.value = Date.now();
  invoiceDate.value = new Date(invoiceDateUnix.value).toLocaleDateString(
    "en-us",
    dateOptions.value
  );
}

if (editInvoice.value) {
  const currentInvoice: Invoice = currentInvoiceArray.value[0]; // get current invoice info
  // set the form values to the values of the current invoice from the database
  invoiceId.value = currentInvoice.invoiceId;
  billerStreetAddress.value = currentInvoice.billerStreetAddress;
  billerCity.value = currentInvoice.billerCity;
  billerZipCode.value = currentInvoice.billerZipCode;
  billerCountry.value = currentInvoice.billerCountry;
  clientName.value = currentInvoice.clientName;
  clientEmail.value = currentInvoice.clientEmail;
  clientStreetAddress.value = currentInvoice.clientStreetAddress;
  clientCity.value = currentInvoice.clientCity;
  clientZipCode.value = currentInvoice.clientZipCode;
  clientCountry.value = currentInvoice.clientCountry;
  invoiceDate.value = currentInvoice.invoiceDate;
  invoiceDateUnix.value = currentInvoice.invoiceDateUnix;
  paymentDueDate.value = currentInvoice.paymentDueDate;
  paymentDueDateUnix.value = currentInvoice.paymentDueDateUnix;
  paymentTerms.value = currentInvoice.paymentTerms;
  productDescription.value = currentInvoice.productDescription;
  invoicePending.value = currentInvoice.invoicePending;
  invoiceDraft.value = currentInvoice.invoiceDraft;
  invoiceTotal.value = currentInvoice.invoiceTotal;
  invoiceItemList.value = currentInvoice.invoiceItemList;
  invoicePaid.value = currentInvoice.invoicePaid;
}

// Methods
const checkClick = (e: any) => {
  if (e.target === invoiceWrap.value) {
    modalStore.toggleModal();
  }
};

const calInvoiceTotal = () => {
  invoiceTotal.value = 0;
  invoiceItemList.value.forEach((item) => {
    invoiceTotal.value += item.total;
  });
};
// Send the invoice to the database
const uploadInvoice = async () => {
  // check that the array of items is not empty
  if (invoiceItemList.value.length <= 0) {
    alert("Please ensure you filled out work items!");
    return;
  }
  calInvoiceTotal();
  const res = await addDocument({
    invoiceId: uid(6),
    billerStreetAddress: billerStreetAddress.value,
    billerCity: billerCity.value,
    billerZipCode: billerZipCode.value,
    billerCountry: billerCountry.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreetAddress: clientStreetAddress.value,
    clientCity: clientCity.value,
    clientZipCode: clientZipCode.value,
    clientCountry: clientCountry.value,
    invoiceDate: invoiceDate.value,
    invoiceDateUnix: invoiceDateUnix.value,
    paymentTerms: paymentTerms.value,
    paymentDueDate: paymentDueDate.value,
    paymentDueDateUnix: paymentDueDateUnix.value,
    productDescription: productDescription.value,
    invoiceItemList: invoiceItemList.value,
    invoiceTotal: invoiceTotal.value,
    invoicePending: invoicePending.value,
    invoiceDraft: invoiceDraft.value,
    invoicePaid: null,
  });
  if (res) {
    invoiceModalStore.toggleInvoice();
    invoiceItemList.value = [];
    await invoiceStore.getInvoices();
  }
};

// update the invoice on firebase
const updateInvoice = async () => {
  if (invoiceItemList.value.length <= 0) {
    alert("Please ensure you filled out work items!");
    return;
  }
  calInvoiceTotal();
  const routeId: string = currentInvoiceArray.value[0].id;
  // easier to manage and tshoot in a variable
  let updatedInvoice: Invoice = {
    invoiceId: invoiceId.value,
    billerStreetAddress: billerStreetAddress.value,
    billerCity: billerCity.value,
    billerZipCode: billerZipCode.value,
    billerCountry: billerCountry.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreetAddress: clientStreetAddress.value,
    clientCity: clientCity.value,
    clientZipCode: clientZipCode.value,
    clientCountry: clientCountry.value,
    invoiceDate: invoiceDate.value,
    invoiceDateUnix: invoiceDateUnix.value,
    paymentTerms: paymentTerms.value,
    paymentDueDate: paymentDueDate.value,
    paymentDueDateUnix: paymentDueDateUnix.value,
    productDescription: productDescription.value,
    invoiceItemList: invoiceItemList.value,
    invoiceTotal: invoiceTotal.value,
    invoicePending: invoicePending.value,
    invoiceDraft: invoiceDraft.value,
    invoicePaid: invoicePaid.value,
  };
  // submit update to the backend
  await updateCurrentDoc(routeId, updatedInvoice);
  // update the front end
  invoiceStore.updateInvoice(invoiceId.value, routeId);
};

const submitForm = () => {
  if (editInvoice.value) {
    updateInvoice();
    return;
  }
  uploadInvoice();
};
const saveDraft = () => {
  invoiceDraft.value = true;
};
const publishInvoice = () => {
  if (!invoiceDraft.value) {
    // make sure that the pending and draft
    // do not show up at the same time
    invoicePending.value = true;
  }
};

// Method to close the invoice modal
const closeInvoice = () => {
  invoiceModalStore.toggleInvoice();
  if (editInvoice.value) {
    invoiceModalStore.toggleEditInvoice();
    invoiceItemList.value = [];
  }
};

// whatch the payment terms changes
watch(paymentTerms, () => {
  // create a new date instance
  const futureDate: Date = new Date();
  // set the payment date of unix format to the current day + the amount of days selected
  paymentDueDateUnix.value = futureDate.setDate(
    futureDate.getDate() + paymentTerms.value
  );
  // format the payment due date that will be shown in the browser
  paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString(
    "en-us",
    dateOptions.value
  );
});
</script>

<template>
  <div
    @click="checkClick"
    class="fixed top-0 left-0 w-full h-screen overflow-scroll sm:left-[90px] flex flex-col scrollbar-hide"
    ref="invoiceWrap"
  >
    <form
      @submit.prevent="submitForm"
      class="relative p-[56px] max-w-[700px] w-full bg-very-dark-purple text-white shadow-md shadow-slate-800/80"
    >
      <Loading v-show="isPending">Saving...</Loading>
      <h1 v-if="!editInvoice" class="text-2xl mb-12 font-bold">New Invoice</h1>
      <h1 v-else class="text-2xl mb-12 font-bold">
        Edit Invoice <span class="text-lavender mr-1 italic">#</span
        ><span class="uppercase">{{ invoiceId }}</span>
      </h1>
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
            type="email"
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
                  type="number"
                  min="1"
                  v-model="item.qty"
                  class="w-full bg-dark-purple text-white rounded-[4px] py-3 px-1 border-none"
                />
              </td>
              <td class="basis-[20%] text-left">
                <input
                  type="number"
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
            type="button"
            @click="closeInvoice"
            class="bg-red flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center"
          >
            Cancel
          </button>
        </div>
        <div class="flex justify-end">
          <button
            v-if="!editInvoice"
            type="submit"
            @click="saveDraft"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center bg-dark-purple"
          >
            Save Draft
          </button>
          <button
            v-if="!editInvoice"
            type="submit"
            @click="publishInvoice"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center bg-purple"
          >
            Create Invoice
          </button>
          <button
            v-else
            type="submit"
            @click="publishInvoice"
            class="flex py-4 px-6 rounded-[30px] border-none text-xs mr-2 text-white items-center justify-center bg-purple"
          >
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
