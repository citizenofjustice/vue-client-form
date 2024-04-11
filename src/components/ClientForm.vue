<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import { startsWithSeven } from "../utils/vuelidate-helpers";
import {
  initialMainValues,
  clientGroupList,
  therapistsList,
} from "../data/clientInputs.json";
import { store } from "../store/store.js";

const inputs = initialMainValues;
const groups = ref(clientGroupList);
const therapists = ref(therapistsList);

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return { inputs, groups, therapists };
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
        Фамилия:
        <input type="text" v-model="inputs.lastName" class="text-input" />
      </div>
      <div class="form-item">
        Имя: <input type="text" v-model="inputs.firstName" class="text-input" />
      </div>
      <div class="form-item">
        Отчество:
        <input type="text" v-model="inputs.surname" class="text-input" />
      </div>
      <div class="form-item">
        Дата рождения:
        <input type="date" class="text-input" v-model="inputs.birthDate" />
      </div>
      <div class="form-item">
        Номер телефона:
        <input type="text" class="text-input" v-model="inputs.phone" />
      </div>
      <div class="form-item">
        Пол:
        <div>
          <input type="radio" id="male" value="male" v-model="inputs.gender" />
          <label for="male">муж.</label>

          <input
            type="radio"
            id="female"
            value="female"
            v-model="inputs.gender"
          />
          <label for="female">жен.</label>
        </div>
      </div>
      <div class="form-item">
        Группа клиентов:
        <select v-model="inputs.groupRelation" multiple>
          <option disabled value="">выберите группы</option>
          <option
            v-for="(group, index) in groups"
            :value="group.value"
            :key="index"
          >
            {{ group.text }}
          </option>
        </select>
      </div>
      <div class="form-item">
        Лечащий врач:
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
        Не отправлять СМС:
        <input type="checkbox" v-model="inputs.contactBySms" />
      </div>
      <slot />
    </form>
  </section>
</template>
