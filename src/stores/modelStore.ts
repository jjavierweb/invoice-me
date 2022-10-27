import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    modalActive: null as boolean | null,
  }),
  actions: {
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
  },
});
