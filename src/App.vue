<script setup>
import ClientForm from "./components/ClientForm.vue";
import AdressForm from "./components/AdressForm.vue";
import DocumentForm from "./components/DocumentForm.vue";
import FormSendResult from "./components/FormSendResult.vue";
import { store } from "./store/store.js";
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <div v-if="store.page === 0" class="centered-text">
        <FormSendResult />
      </div>
      <Transition mode="out-in">
        <ClientForm v-if="store.page === 1">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </ClientForm>
        <AdressForm v-else-if="store.page === 2">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </AdressForm>
        <DocumentForm v-else-if="store.page === 3">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </DocumentForm>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

body {
  font-family: sans-serif;
  font-size: 1rem;
  select,
  input,
  label,
  textarea,
  button,
  input[type="date"] {
    font-family: sans-serif;
    font-size: 1rem;
  }
}

.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  width: 24rem;
}

.client {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
}

.form-item {
  width: 100%;
  display: flex;
  column-gap: 1rem;
  justify-content: space-between;
  & > label {
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  & > select,
  .text-input {
    padding: 0.25rem 0.5rem;
    width: 100%;
    max-width: 160px;
  }
  .date-input {
    width: 100%;
    max-width: 160px;
    padding: 0.25rem 0.5rem;
  }
  .radio-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.25rem 0.5rem;
    width: 100%;
    max-width: 160px;
  }
  .checkbox {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 160px;
    input[type="checkbox"] {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  button {
    margin: 1rem auto 0;
    padding: 0.5rem;
  }
}

.centered-text {
  text-align: center;
}
</style>
