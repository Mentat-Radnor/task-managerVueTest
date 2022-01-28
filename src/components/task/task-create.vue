<template>
  <form @submit.prevent="createNewTask">
    <input
      data-testid="form-input"
      type="text"
      placeholder="Новая задача"
      v-model="task"
    />
    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import { postTask } from "@/services/TaskActions.js";
export default {
  name: "TaskCreate",
  data() {
    return {
      task: "",
    };
  },
  methods: {
    async createNewTask() {
      await postTask({ message: this.task });
      this.message = "";
    },
  },
};
</script>

<style></style>
