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
    <p class="heading-l text-battleship-grey text-center">
      This board is empty. Create a new column to get started.
    </p>
    <button
      class="bg-purple-heart hover:bg-lavender-blue heading-m rounded-3xl px-[18px] py-4 text-white transition-colors"
    >
      + Add New Column
    </button>
  </div>
  <div
    v-else
    class="grid max-h-[calc(100vh-6rem+1px)] min-w-[calc(100vw-300px)] max-w-[100vw] grid-flow-col justify-start gap-5 overflow-scroll p-6"
  >
    <Column v-for="({ name, tasks }, index) in currentBoard.columns" :key="index" :name :tasks />
  </div>
</template>
