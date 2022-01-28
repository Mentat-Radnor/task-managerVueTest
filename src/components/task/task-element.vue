<template>
  <li>
    <input
      type="checkbox"
      data-testid="task-completed"
      :checked="task.completed"
      @click="taskComplete"
    />

    {{ task.message }}
    <button
      data-testid="delete-button"
      id="deleteButton"
      @click="deleteInComponent"
    >
      Удалить задачу
    </button>
  </li>
</template>

<script>
import { deleteTask } from "@/services/TaskActions.js";
export default {
  name: "TaskElement",
  props: {
    task: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  methods: {
    async deleteInComponent() {
      try {
        await deleteTask(this.task.id);
      } catch (error) {
        console.log(error);
      }
    },
    taskComplete(event) {
      this.$emit("update-task-completed", event.target.checked);
    },
  },
};
</script>

<style></style>
