<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import { useThemeStore as useTheme } from "@/stores/theme";
import { useSidebarStore } from "@/stores/sidebar";
import Button from "./Button.vue";

const boardStore = useBoardStore();
const theme = useTheme();
const sidebarStore = useSidebarStore();

const { boardNames, currentBoardIndex, currentBoard } = storeToRefs(boardStore);
const isBoardMenuOpen = ref(false);
const isEllipsisOpen = ref(false);

const isDarkTheme = computed(() => theme.currentTheme === "dark");
const hasColumns = computed(() => !!currentBoard.value?.columns.length);
const logoWidth = computed(() => sidebarStore.visible ? "md:w-[300px]" : "md:w-[209px]");
</script>

<template>
  <nav
    class="border-alice-blue dark:border-outer-space dark:bg-charcoal flex min-h-24 items-stretch border-b bg-white duration-200"
  >
    <picture
      :class="logoWidth"
      class="md:border-r-alice-blue md:dark:border-r-outer-space flex shrink-0 items-center pl-4 transition-[width] duration-200 md:border-r md:pl-8"
    >
      <source
        :srcset="isDarkTheme ? '/assets/icons/logo-light.svg' : '/assets/icons/logo-dark.svg'"
        media="(min-width: 768px)"
      />
      <img alt="logo" class="my-auto" src="/assets/icons/logo-mobile.svg" />
    </picture>
    <div class="flex flex-1 items-center justify-between px-4 md:px-6">
      <button
        class="flex items-center gap-3 md:cursor-default"
        @click="isBoardMenuOpen = !isBoardMenuOpen"
      >
        <h1 class="text-midnight text-xl font-semibold md:text-2xl dark:text-white">
          {{ boardNames[currentBoardIndex] }}
        </h1>
        <img
          :src="
            isBoardMenuOpen
              ? '/assets/icons/icon-chevron-up.svg'
              : '/assets/icons/icon-chevron-down.svg'
          "
          alt="open or hide board menu"
          class="mt-1 h-2.5 w-3.5 md:hidden"
        />
      </button>
      <div class="flex items-center gap-4">
        <Button :disabled="!hasColumns" @click="boardStore.openAddTask()">
          <img
            alt="add new task"
            class="h-3 w-3 lg:h-2.5 lg:w-2.5"
            src="/assets/icons/icon-add-task-mobile.svg"
          />
          <span class="hidden text-nowrap heading-m text-white lg:inline-block">Add New Task</span>
        </Button>
        <div class="relative">
          <div
            v-if="isEllipsisOpen"
            class="fixed inset-0"
            @click="isEllipsisOpen = false"
          />
          <button class="relative z-10" @click="isEllipsisOpen = !isEllipsisOpen">
            <img
              alt="board options"
              class="cursor-pointer"
              src="/assets/icons/icon-vertical-ellipsis.svg"
            />
          </button>
          <div
            v-if="isEllipsisOpen"
            class="absolute right-0 top-full z-10 mt-4 w-48 rounded-lg bg-white py-4 shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-gunmetal"
          >
            <button
              class="body-l w-full px-4 py-2 text-left text-battleship-grey transition-colors hover:text-midnight dark:hover:text-white"
              @click="() => { boardStore.openEditBoard(); isEllipsisOpen = false; }"
            >
              Edit Board
            </button>
            <button
              class="body-l w-full px-4 py-2 text-left text-red-orange transition-colors hover:text-pink-salmon"
              @click="() => { boardStore.openDeleteBoard(); isEllipsisOpen = false; }"
            >
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
