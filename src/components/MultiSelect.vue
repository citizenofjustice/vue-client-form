<script>
import { ref } from "vue";
import { clientGroupList } from "../data/clientInputs.json";

const groups = ref(clientGroupList);
const show = ref(false);
export default {
  data() {
    return { groups, show };
  },
  methods: {
    logState() {
      console.log("asdasd");
    },
  },
};
</script>

<template>
  <div class="form-item">
    <label>Группа клиентов:</label>
    <div class="multi-select-parent">
      <div @click="show = !show" class="multi-select-trigger">
        выбрать группы <span>v</span>
      </div>
      <Transition>
        <div v-if="show" class="multi-select">
          <span
            v-for="(group, index) in groups"
            @click="logState"
            :value="group.value"
            :key="index"
            class="option"
          >
            <input type="checkbox" />
            {{ group.text }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
  <!-- 
    <select v-model="inputs.groupRelation" multiple>
          <option disabled value="">выберите группы</option>
          <option
            v-for="(group, index) in groups"
            @click="logState"
            :value="group.value"
            :key="index"
          >
            {{ group.text }}
          </option>
        </select>
   -->
</template>

<style lang="scss">
.multi-select-parent {
  position: relative;
  width: 100%;
  max-width: 160px;
  border: 1px solid grey;
  border-radius: 2px;
  .multi-select-trigger {
    padding: 0.25rem 0.5rem;
    display: flex;
    justify-content: space-between;
    &:hover {
      cursor: default;
    }
  }
  .multi-select {
    width: 100%;
    padding: 0.25rem 0.5rem;
    z-index: 20;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 5px;
    gap-row: 0.25rem;
    .option {
      display: flex;
      align-items: center;
      padding: 0.375rem 0.25rem;
      &:hover {
        cursor: default;
      }
      input[type="checkbox"] {
        margin-right: 0.5rem;
      }
    }
    .option:not(:last-child) {
      border-bottom: 1px solid darkgray;
    }
  }
}
</style>
