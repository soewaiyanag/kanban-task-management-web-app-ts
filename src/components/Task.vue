<script lang="ts" setup>
import type { Subtask, Task } from "@/types/board";

defineProps<{ task: Task }>();
</script>

<template>
  <div
    class="group w-full cursor-pointer rounded-lg bg-white px-4 py-[23px] shadow-[0px_4px_6px_rgba(54,78,126,0.1)] dark:bg-charcoal"
  >
    <h2 class="heading-m text-midnight transition-colors group-hover:text-purple-heart dark:text-white">
      {{ task.title }}
    </h2>
    <span class="body-m mt-3 block text-battleship-grey">
      {{ task.subtasks.filter((st: Subtask) => st.isCompleted).length }} of
      {{ task.subtasks.length }} subtasks
    </span>
  </div>
</template>
