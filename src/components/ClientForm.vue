<script>
import { ref } from "vue";

const inputs = {
  firstName: "",
  lastName: "",
  surname: "",
  birthDate: "",
  phone: "",
  gender: "",
  groupRelation: [],
  workingTherapist: "",
  contactBySms: false,
};
const groups = ref([
  { text: "VIP", value: "VIP" },
  { text: "Проблемные", value: "Проблемные" },
  { text: "ОМС", value: "ОМС" },
]);
const therapists = ref([
  { text: "Иванов", value: "Иванов" },
  { text: "Захаров", value: "Захаров" },
  { text: "Чернышева", value: "Чернышева" },
]);
const users = [];
export default {
  data() {
    return { ...inputs, groups, therapists, users };
  },
  methods: {
    sendForm() {
      users.push({
        firstName: this.firstName,
        lastName: this.lastName,
        surname: this.surname,
      });
    },
  },
};
</script>

<template>
  <section class="form-wrapper">
    <form class="client" @submit.prevent="sendForm">
      <div class="form-item">
        Фамилия: <input type="text" v-model="lastName" class="text-input" />
      </div>
      <div class="form-item">
        Имя: <input type="text" v-model="firstName" class="text-input" />
      </div>
      <div class="form-item">
        Отчество:
        <input type="text" v-model="surname" class="text-input" />
      </div>
      <div class="form-item">
        Дата рождения:
        <input type="date" class="text-input" />
      </div>
      <div class="form-item">
        Номер телефона:
        <input type="text" class="text-input" />
      </div>
      <div class="form-item">
        Пол:
        <div>
          <input type="radio" id="male" value="male" v-model="gender" />
          <label for="male">муж.</label>

          <input type="radio" id="female" value="female" v-model="gender" />
          <label for="female">жен.</label>
        </div>
      </div>
      <div class="form-item">
        Группа клиентов:
        <select v-model="groupRelation" multiple>
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
        <select v-model="workingTherapist">
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
        <input type="checkbox" v-model="contactBySms" />
      </div>
      <div class="form-item">
        <button type="submit">Отправить</button>
      </div>
    </form>
  </section>
</template>

<style lang="scss">
.form-wrapper {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

.client {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 24rem;
  width: fit-content;
}

.form-item {
  width: 100%;
  display: flex;
  column-gap: 1rem;
  justify-content: space-between;
}
</style>
