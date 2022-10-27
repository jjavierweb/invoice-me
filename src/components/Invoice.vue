<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps({
  invoice: Object,
});
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
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
