<script setup lang="ts">
import { RouterLink } from "vue-router";

// import types
import type { Invoice } from "@/types/interfaces";

const props = defineProps<{
  invoice: Invoice;
}>();
</script>

<template>
  <RouterLink
    class="flex cursor-pointer gap-4 mb-4 text-white rounded-[20px] py-[28px] px-8 items-cente bg-weird-purple"
    :to="{ name: 'invoice', params: { id: invoice.id } }"
  >
    <!-- LEFT -->
    <div class="flex items-center basis-3/5 gap-4">
      <span class="uppercase flex-1"># {{ invoice.invoiceId }}</span>
      <span class="flex-1">{{ invoice.paymentDueDate }}</span>
      <span class="flex-1">{{ invoice.clientName }}</span>
    </div>
    <!-- RIGHT -->
    <div class="flex gap-4 basis-2/5 items-center">
      <span class="flex-1 text-base font-semibold"
        >${{ invoice.invoiceTotal }}</span
      >
      <!-- Status buttons -->
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div>
        <img src="@/assets/images/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
span {
  font-size: 13px;
}
</style>
