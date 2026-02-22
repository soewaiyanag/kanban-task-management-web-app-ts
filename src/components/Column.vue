<script lang="ts" setup>
import type { Task } from "@/types/board";
import TaskCard from "./Task.vue";

defineProps<{ name: string; tasks: Task[] }>();
</script>

<template>
  <div class="w-72 space-y-5">
    <h2 class="heading-s text-battleship-grey uppercase">
      {{ name }} ({{ tasks.length }})
    </h2>
    <TaskCard v-for="(task, index) in tasks" :key="index" :task />
  </div>
</template>
