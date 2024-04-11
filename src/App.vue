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
      <Transition>
        <ClientForm v-if="store.page === 1">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </ClientForm>
        <AdressForm v-if="store.page === 2">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </AdressForm>
        <DocumentForm v-if="store.page === 3">
          <div class="form-item">
            <button type="submit">Отправить</button>
          </div>
        </DocumentForm>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.wrapper {
  width: 24rem;
  margin: 0 auto;
}

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
  width: 100%;
}

.form-item {
  width: 100%;
  display: flex;
  column-gap: 1rem;
  justify-content: space-between;
}

.centered-text {
  text-align: center;
}
</style>
