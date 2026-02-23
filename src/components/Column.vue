<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";
import { useBoardStore } from "@/stores/board";
import TaskCard from "./Task.vue";

const COLUMN_COLORS = ["#49C4E5", "#8471F2", "#67E2AE", "#635FC7", "#EA5555"];

const props = defineProps<{ index: number }>();

const boardStore = useBoardStore();
const { currentBoard } = storeToRefs(boardStore);

const column = computed(() => currentBoard.value.columns[props.index]);
const dotColor = computed(() => COLUMN_COLORS[props.index % COLUMN_COLORS.length]);

const tasks = computed({
  get: () => column.value.tasks,
  set: (val) => {
    column.value.tasks = val;
  },
});

function onAdd(evt: { newIndex?: number }) {
  const task = column.value.tasks[evt.newIndex ?? 0];
  if (task) task.status = column.value.name;
}
</script>

<template>
  <div :class="['w-72', tasks.length === 0 && 'self-stretch flex flex-col']">
    <h2 class="heading-s mb-5 flex items-center gap-3 uppercase text-battleship-grey">
      <span class="inline-block size-4 shrink-0 rounded-full" :style="{ backgroundColor: dotColor }" />
      {{ column.name }} ({{ column.tasks.length }})
    </h2>
    <!-- Wrapper provides positioning context; flex-1 when empty to fill remaining column height -->
    <div :class="['relative', tasks.length === 0 ? 'flex-1' : '']">
      <VueDraggable
        v-model="tasks"
        group="tasks"
        :animation="200"
        ghost-class="sortable-ghost"
        class="space-y-5"
        :class="tasks.length === 0 ? 'h-full' : ''"
        @add="onAdd"
      >
        <TaskCard v-for="task in tasks" :key="task.id ?? task.title" :task />
      </VueDraggable>
      <!-- Placeholder sits outside VueDraggable so SortableJS never sees it -->
      <div
        v-if="tasks.length === 0"
        class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-[rgba(130,143,163,0.25)]"
      >
        <span class="body-l select-none text-battleship-grey opacity-50">No tasks yet</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.sortable-ghost) {
  opacity: 0.4;
  border-radius: 8px;
}
</style>
