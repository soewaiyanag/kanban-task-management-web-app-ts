<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import Column from "./Column.vue";

// composables
const boardStore = useBoardStore();

// states
const { currentBoard } = storeToRefs(boardStore);
</script>

<template>
  <div
    class="grid max-h-[calc(100vh-6rem+1px)] min-w-[calc(100vw-18rem)] max-w-[100vw] grid-flow-col justify-start gap-5 overflow-scroll p-6"
  >
    <Column v-for="({ name, tasks }, index) in currentBoard.columns" :key="index" :tasks />
  </div>
</template>
