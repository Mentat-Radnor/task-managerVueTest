<template>
  <h1 data-testid="title">Ваши задачи</h1>
  <ul>
    <task-element
      v-for="(element, index) in taskList"
      :key="'task' + index"
      :task="element"
      :index="index"
      @update-task-completed="updateTask"
      data-testid="task"
    ></task-element>
  </ul>
</template>

<script>
import TaskElement from "@/components/task/task-element.vue";

export default {
  name: "TaskList",
  components: { "task-element": TaskElement },

  created() {
    this.$store.dispatch("getTasksFromApi");
  },
  computed: {
    taskList() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    updateTask(event) {
      this.$store.dispatch("updateTaskFromServer", [
        { completed: event },
        this.task.id,
      ]);
    },
  },
};
</script>

<style></style>
