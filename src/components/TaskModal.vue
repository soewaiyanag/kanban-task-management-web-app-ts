<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const { selectedTask: task, currentBoard } = storeToRefs(boardStore);

const completedCount = computed(
  () => task.value?.subtasks.filter((s) => s.isCompleted).length ?? 0,
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="task"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click="boardStore.closeTask()"
    >
      <div
        class="relative w-[480px] max-h-[90vh] overflow-y-auto rounded-[6px] bg-white p-8 dark:bg-charcoal"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-6">
          <h2 class="heading-l text-midnight dark:text-white">{{ task.title }}</h2>
          <button class="mt-1 shrink-0" @click="boardStore.openEditTask()">
            <img alt="task options" src="/assets/icons/icon-vertical-ellipsis.svg" />
          </button>
        </div>

        <!-- Description -->
        <p v-if="task.description" class="body-l mt-6 text-battleship-grey">
          {{ task.description }}
        </p>

        <!-- Subtasks -->
        <div class="mt-6">
          <p class="body-m mb-4 text-battleship-grey dark:text-white">
            Subtasks ({{ completedCount }} of {{ task.subtasks.length }})
          </p>
          <div class="space-y-2">
            <label
              v-for="(subtask, i) in task.subtasks"
              :key="i"
              class="flex cursor-pointer items-center gap-4 rounded-[4px] bg-baby-blue px-3 py-3 transition-colors hover:bg-purple-heart/25 dark:bg-gunmetal dark:hover:bg-purple-heart/25"
            >
              <input
                type="checkbox"
                :checked="subtask.isCompleted"
                class="sr-only"
                @change="subtask.isCompleted = !subtask.isCompleted"
              />
              <div
                :class="[
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px]',
                  subtask.isCompleted
                    ? 'bg-purple-heart'
                    : 'border border-[rgba(130,143,163,0.25)] bg-white dark:bg-charcoal',
                ]"
              >
                <img
                  v-if="subtask.isCompleted"
                  alt=""
                  class="block"
                  src="/assets/icons/icon-check.svg"
                />
              </div>
              <span
                :class="[
                  'body-m text-midnight dark:text-white',
                  subtask.isCompleted && 'opacity-50 line-through',
                ]"
              >{{ subtask.title }}</span>
            </label>
          </div>
        </div>

        <!-- Current Status -->
        <div class="mt-6">
          <p class="body-m mb-4 text-battleship-grey dark:text-white">Current Status</p>
          <div class="relative">
            <select
              v-model="task.status"
              class="body-l w-full cursor-pointer appearance-none rounded-[4px] border border-[rgba(130,143,163,0.25)] bg-white px-4 py-3 text-midnight focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white"
            >
              <option
                v-for="col in currentBoard.columns"
                :key="col.name"
                :value="col.name"
              >{{ col.name }}</option>
            </select>
            <img
              alt=""
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              src="/assets/icons/icon-chevron-down.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
