<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import { useThemeStore as useTheme } from "@/stores/theme";
import Button from "./Button.vue";

// Composable
const boardStore = useBoardStore();
const theme = useTheme();

// States
const { boardNames, currentBoardIndex } = storeToRefs(boardStore);
const isBoardMenuOpen = ref(false);

// Computed
const isDarkTheme = computed(() => theme.currentTheme === "dark");
</script>

<template>
  <nav
    class="border-alice-blue dark:border-outer-space dark:bg-charcoal flex min-h-24 items-stretch space-x-8 border-b bg-white px-6 duration-200"
  >
    <picture
      class="md:border-r-alice-blue md:dark:border-r-outer-space flex md:min-w-64 md:border-r"
    >
      <source
        :srcset="isDarkTheme ? '/assets/icons/logo-light.svg' : '/assets/icons/logo-dark.svg'"
        media="(min-width: 768px)"
      />
      <img alt="logo" class="my-auto" src="/assets/icons/logo-mobile.svg" />
    </picture>
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center gap-3">
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
      </div>
      <div class="flex items-center gap-4">
        <Button>
          <img
            alt="add new task"
            class="h-3 w-3 lg:h-2.5 lg:w-2.5"
            src="/assets/icons/icon-add-task-mobile.svg"
          />
          <span class="hidden text-nowrap text-base font-medium text-white lg:inline-block"
            >Add New Task</span
          >
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
