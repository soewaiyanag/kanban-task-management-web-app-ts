<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import Column from "./Column.vue";

const boardStore = useBoardStore();
const { currentBoard } = storeToRefs(boardStore);
</script>

<template>
  <div
    v-if="!currentBoard.columns.length"
    class="flex min-h-[calc(100vh-6rem+1px)] flex-col items-center justify-center gap-6 px-6"
  >
    <p class="heading-l text-center text-battleship-grey">
      This board is empty. Create a new column to get started.
    </p>
    <button
      class="heading-m rounded-3xl bg-purple-heart px-[18px] py-4 text-white transition-colors hover:bg-lavender-blue"
    >
      + Add New Column
    </button>
  </div>
  <div
    v-else
    class="grid max-h-[calc(100vh-6rem+1px)] min-w-[calc(100vw-300px)] max-w-[100vw] grid-flow-col items-start justify-start gap-5 overflow-scroll p-6"
  >
    <Column
      v-for="({ name, tasks }, index) in currentBoard.columns"
      :key="index"
      :name
      :tasks
      :index
    />
    <!-- + New Column card -->
    <div
      class="mt-8 flex w-72 cursor-pointer items-center justify-center self-stretch rounded-md bg-gradient-to-b from-[#e9effa] to-[rgba(233,239,250,0.5)] transition-opacity hover:opacity-80 dark:from-[rgba(43,44,55,0.25)] dark:to-[rgba(43,44,55,0.13)]"
    >
      <span class="heading-xl text-battleship-grey">+ New Column</span>
    </div>
  </div>
</template>
