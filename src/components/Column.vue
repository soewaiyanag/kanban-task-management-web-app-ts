<script lang="ts" setup>
import Task from "./Task.vue";

defineProps(["name", "tasks"]);
</script>

<template>
  <div class="w-96 space-y-5">
    <Task v-for="(task, index) in tasks" :key="index" :task />
  </div>
</template>
