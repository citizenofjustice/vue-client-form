<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  initialDocumentValues,
  documentTypeList,
} from "../data/clientInputs.json";
import { store } from "../store/store.js";

const inputs = initialDocumentValues;
const documentTypes = ref(documentTypeList);
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return { inputs, documentTypes };
  },
  validations() {
    return {
      inputs: {
        documentType: { required },
        issueDate: { required },
      },
    };
  },
  methods: {
    async sendForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      store.setUser({ ...store.user, docs: { ...inputs } });
      store.nextPage();
    },
  },
};
</script>

<template>
  <section class="form-wrapper">
    <form class="client" @submit.prevent="sendForm">
      <div class="form-item">
        Тип документа:
        <select v-model="inputs.documentType">
          <option disabled value="">выберите тип</option>
          <option
            v-for="(type, index) in documentTypes"
            :value="type.value"
            :key="index"
          >
            {{ type.text }}
          </option>
        </select>
      </div>
      <div class="form-item">
        Серия:
        <input type="text" v-model="inputs.serial" class="text-input" />
      </div>
      <div class="form-item">
        Номер:
        <input type="text" v-model="inputs.number" class="text-input" />
      </div>
      <div class="form-item">
        Кем выдан:
        <input type="text" v-model="inputs.issuedBy" class="text-input" />
      </div>
      <div class="form-item">
        Дата выдачи:
        <input type="date" v-model="inputs.issueDate" class="text-input" />
      </div>
      <div class="form-item">
        <button type="submit">Отправить</button>
      </div>
    </form>
  </section>
</template>
