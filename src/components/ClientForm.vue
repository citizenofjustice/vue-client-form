<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import { startsWithSeven } from "../utils/vuelidate-helpers";
import { initialMainValues, therapistsList } from "../data/clientInputs.json";
import { store } from "../store/store.js";
import MultiSelect from "./MultiSelect.vue";

const inputs = initialMainValues;
const therapists = ref(therapistsList);

export default {
  components: {
    MultiSelect,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return { inputs, therapists };
  },
  validations() {
    return {
      inputs: {
        firstName: { required },
        lastName: { required },
        birthDate: { required },
        phone: {
          required,
          numeric,
          minLengthValue: minLength(11),
          maxLengthValue: maxLength(11),
          startsWithSeven,
        },
        groupRelation: { required },
      },
    };
  },
  computed: {},
  methods: {
    async sendForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      store.setUser({ ...store.user, main: { ...inputs } });
      store.nextPage();
    },
  },
};
</script>

<template>
  <section class="form-wrapper">
    <form class="client" @submit.prevent="sendForm">
      <div class="form-item">
        <label>Фамилия:</label>
        <input type="text" v-model="inputs.lastName" class="text-input" />
      </div>
      <div class="form-item">
        <label>Имя:</label>
        <input type="text" v-model="inputs.firstName" class="text-input" />
      </div>
      <div class="form-item">
        <label>Отчество:</label>
        <input type="text" v-model="inputs.surname" class="text-input" />
      </div>
      <div class="form-item">
        <label>Дата рождения:</label>
        <input type="date" class="date-input" v-model="inputs.birthDate" />
      </div>
      <div class="form-item">
        <label>Номер телефона:</label>
        <input type="text" class="text-input" v-model="inputs.phone" />
      </div>
      <div class="form-item">
        <label>Пол:</label>
        <div class="radio-buttons">
          <label for="male">
            <input
              type="radio"
              id="male"
              value="male"
              v-model="inputs.gender"
            />
            муж.
          </label>
          <label for="female">
            <input
              type="radio"
              id="female"
              value="female"
              v-model="inputs.gender"
            />
            жен.
          </label>
        </div>
      </div>
      <MultiSelect />
      <div class="form-item">
        <label>Лечащий врач:</label>
        <select v-model="inputs.workingTherapist">
          <option disabled value="">выберите врача</option>
          <option
            v-for="(therapist, index) in therapists"
            :value="therapist.value"
            :key="index"
          >
            {{ therapist.text }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <label>Не отправлять СМС:</label>
        <div class="checkbox">
          <input type="checkbox" v-model="inputs.contactBySms" />
        </div>
      </div>
      <slot />
    </form>
  </section>
</template>
