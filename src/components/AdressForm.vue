<script>
import { useVuelidate } from "@vuelidate/core";
import { initialAddressValues } from "../data/clientInputs.json";
import { required } from "@vuelidate/validators";
import { store } from "../store/store.js";

const inputs = initialAddressValues;

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return { inputs };
  },
  validations() {
    return {
      inputs: {
        city: { required },
      },
    };
  },
  methods: {
    async sendForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      store.setUser({ ...store.user, address: { ...inputs } });
      store.nextPage();
    },
  },
};
</script>

<template>
  <section class="form-wrapper">
    <form class="client" @submit.prevent="sendForm">
      <div class="form-item">
        Индекс:
        <input type="text" v-model="inputs.index" class="text-input" />
      </div>
      <div class="form-item">
        Страна:
        <input type="text" v-model="inputs.country" class="text-input" />
      </div>
      <div class="form-item">
        Область:
        <input type="text" v-model="inputs.region" class="text-input" />
      </div>
      <div class="form-item">
        Город:
        <input type="text" v-model="inputs.city" class="text-input" />
      </div>
      <div class="form-item">
        Улица:
        <input type="text" v-model="inputs.street" class="text-input" />
      </div>
      <div class="form-item">
        Дом:
        <input type="text" v-model="inputs.house" class="text-input" />
      </div>
      <div class="form-item">
        <button type="submit">Отправить</button>
      </div>
    </form>
  </section>
</template>
