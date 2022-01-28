<template>
  <div class="home">
    <task-create></task-create>
    <task-list></task-list>
  </div>
</template>

<script>
import TaskCreate from "@/components/task/task-create.vue";
import TaskList from "@/components/task/task-list.vue";

export default {
  name: "Home",
  components: {
    "task-create": TaskCreate,
    "task-list": TaskList,
  },
};
</script>
