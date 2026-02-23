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
    class="flex min-h-[calc(100vh-4rem+1px)] flex-col items-center justify-center gap-6 bg-baby-blue px-6 dark:bg-gunmetal md:min-h-[calc(100vh-6rem+1px)]"
  >
    <p class="heading-l text-center text-battleship-grey">
      This board is empty. Create a new column to get started.
    </p>
    <button
      class="heading-m rounded-3xl bg-purple-heart px-[18px] py-4 text-white transition-colors hover:bg-lavender-blue"
      @click="boardStore.openEditBoard()"
    >
      + Add New Column
    </button>
  </div>
  <div
    v-else
    class="scrollbar-custom grid h-[calc(100vh-4rem)] min-w-0 grid-flow-col items-start justify-start gap-5 overflow-scroll p-6 md:h-[calc(100vh-6rem)]"
  >
    <Column
      v-for="(_, index) in currentBoard.columns"
      :key="index"
      :index
    />
    <!-- + New Column card -->
    <div
      class="group mt-8 flex w-72 cursor-pointer flex-col items-center justify-center gap-5 self-stretch rounded-lg border-2 border-dashed border-[rgba(130,143,163,0.25)] transition-colors hover:border-purple-heart/40"
      @click="boardStore.openEditBoard()"
    >
      <div class="relative flex items-center justify-center">
        <!-- Ripple: only plays on hover -->
        <span class="absolute size-8 rounded-full bg-purple-heart opacity-0 group-hover:animate-ping group-hover:opacity-20" />
        <!-- Icon circle -->
        <span class="relative flex size-11 items-center justify-center rounded-full border-2 border-[rgba(130,143,163,0.4)] text-battleship-grey transition-colors group-hover:border-purple-heart group-hover:text-purple-heart">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5V0z" />
          </svg>
        </span>
      </div>
      <span class="heading-m text-battleship-grey transition-colors group-hover:text-purple-heart">New Column</span>
    </div>
  </div>
</template>
