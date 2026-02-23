<script lang="ts" setup>
import HideSidebarIcon from "@/components/Icons/HideSidebarIcon.vue";
import BoardMenu from "./BoardMenu.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { ref } from "vue";
import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
const showSlideOpen = ref<boolean>(false);

const showSlide = () => {
  sidebarStore.visible = true;
  showSlideOpen.value = false;
};

const hideSlide = () => {
  sidebarStore.visible = false;
};

const handleTransitionEnd = () => {
  if (!sidebarStore.visible) {
    showSlideOpen.value = true;
  }
};
</script>

<template>
  <div
    class="sticky top-[calc(100vh-6rem+1px)] z-10 min-h-[calc(100vh-6rem+1px)]"
  >
    <div
      :class="sidebarStore.visible ? 'w-[300px] px-6 opacity-100' : 'w-0 opacity-0'"
      class="border-r-alice-blue dark:border-r-outer-space dark:bg-charcoal -mt-px flex min-h-full flex-col overflow-hidden border-r bg-white transition-all duration-200"
      @transitionend="handleTransitionEnd"
    >
      <BoardMenu />
      <ThemeSwitcher class="mt-auto" />
      <button
        class="hover:bg-purple-heart/10 group my-8 -ml-6 flex items-center gap-4 text-nowrap rounded-r-3xl py-3.5 pl-6 text-left transition-colors"
        @click="hideSlide"
      >
        <HideSidebarIcon class="fill-battleship-grey group-hover:fill-purple-heart" />
        <span class="text-battleship-grey group-hover:text-purple-heart font-semibold"
          >Hide Sidebar</span
        >
      </button>
    </div>
    <button
      v-show="showSlideOpen"
      class="bg-purple-heart hover:bg-lavender-blue absolute bottom-8 left-0 flex h-[48px] w-14 animate-slideRight items-center justify-center rounded-r-[100px] transition-colors"
      @click="showSlide"
    >
      <img alt="show sidebar" src="/assets/icons/icon-show-sidebar.svg" />
    </button>
  </div>
</template>
