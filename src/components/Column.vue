<script lang="ts" setup>
import { computed } from "vue";
import type { Task } from "@/types/board";
import TaskCard from "./Task.vue";

const COLUMN_COLORS = ["#49C4E5", "#8471F2", "#67E2AE", "#635FC7", "#EA5555"];

const props = defineProps<{ name: string; tasks: Task[]; index: number }>();

const dotColor = computed(() => COLUMN_COLORS[props.index % COLUMN_COLORS.length]);
</script>

<template>
  <div class="w-72 space-y-5">
    <h2 class="heading-s text-battleship-grey flex items-center gap-3 uppercase">
      <span class="inline-block size-4 shrink-0 rounded-full" :style="{ backgroundColor: dotColor }" />
      {{ name }} ({{ tasks.length }})
    </h2>
    <TaskCard v-for="(task, i) in tasks" :key="i" :task />
  </div>
</template>
