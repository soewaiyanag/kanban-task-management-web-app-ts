<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import BoardIcon from "@/components/Icons/BoardIcon.vue";

const boardStore = useBoardStore();
const { boardNames, currentBoardIndex } = storeToRefs(boardStore);

const isCurrentBoard = (index: number) => currentBoardIndex.value === index;

const handleBoardClick = (index: number) => {
  boardStore.updateCurrentBoardIndex(index);
};

const createNewBoard = () => {
  console.log("Create new board clicked");
};
</script>

<template>
  <div class="whitespace-nowrap text-nowrap pt-6">
    <h2 class="text-battleship-grey mb-4 text-base font-normal uppercase">
      All Boards ({{ boardNames.length }})
    </h2>
    <div role="list">
      <button
        v-for="(boardName, index) in boardNames"
        :key="index"
        :aria-pressed="isCurrentBoard(index)"
        :class="{
          'bg-purple-heart text-white': isCurrentBoard(index),
          'text-battleship-grey hover:bg-purple-heart/10 hover:text-purple-heart':
            !isCurrentBoard(index),
        }"
        class="group -ml-12 flex w-full cursor-pointer select-none items-center gap-3 rounded-r-3xl py-3.5 pl-12 font-semibold transition-colors"
        role="menuitem"
        @click="handleBoardClick(index)"
      >
        <BoardIcon
          :class="{
            'fill-white': isCurrentBoard(index),
            'fill-battleship-grey group-hover:fill-purple-heart': !isCurrentBoard(index),
          }"
        />
        {{ boardName }}
      </button>
      <button
        class="text-purple-heart group -ml-12 flex w-full cursor-pointer select-none items-center gap-3 rounded-r-3xl py-3.5 pl-12 font-semibold transition-colors"
        role="menuitem"
        @click="createNewBoard"
      >
        <BoardIcon class="fill-purple-heart" />
        <span>+ Create New Board</span>
      </button>
    </div>
  </div>
</template>
