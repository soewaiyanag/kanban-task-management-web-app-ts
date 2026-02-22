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
        <Button :disabled="!hasColumns">
          <img
            alt="add new task"
            class="h-3 w-3 lg:h-2.5 lg:w-2.5"
            src="/assets/icons/icon-add-task-mobile.svg"
          />
          <span class="hidden text-nowrap heading-m text-white lg:inline-block">Add New Task</span>
        </Button>
        <button>
          <img
            alt="vertical ellipsis"
            class="cursor-pointer"
            src="/assets/icons/icon-vertical-ellipsis.svg"
          />
        </button>
      </div>
    </div>
  </nav>
</template>
