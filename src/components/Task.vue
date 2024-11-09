<script lang="ts" setup>
import type { Subtask } from "@/stores/board";

defineProps(["task"]);
</script>

<template>
  <div
    class="dark:bg-charcoal group w-full cursor-pointer rounded-lg bg-white px-4 py-8 shadow-md dark:text-white"
  >
    <h2 class="heading-l group-hover:text-purple-heart transition-colors">
      {{ task.title }}
    </h2>
    <span class="body-l mt-2 block"
      >{{ task.subtasks.filter((st: Subtask) => st.isCompleted).length }} of
      {{ task.subtasks.length }} subtasks</span
    >
  </div>
</template>
