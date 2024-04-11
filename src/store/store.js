import { reactive } from "vue";

export const store = reactive({
  user: {
    main: {},
    address: {},
    docs: {},
  },
  page: 1,

  setUser(user) {
    this.user = user;
  },
  nextPage() {
    if (this.page === 3) {
      this.page = 0;
      return;
    }
    this.page++;
  },
});
