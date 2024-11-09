<script lang="ts" setup>
import { ref } from "vue";
import HideSidebarIcon from "@/components/Icons/HideSidebarIcon.vue";
import BoardMenu from "./BoardMenu.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const visible = ref<boolean>(false);
const showSlideOpen = ref<boolean>(true);

const showSlide = () => {
  visible.value = true;
  showSlideOpen.value = false;
};

const hideSlide = () => {
  visible.value = false;
};

const handleTransitionEnd = () => {
  if (!visible.value) {
    showSlideOpen.value = true;
  }
};
</script>

<template>
  <div
    class="justify-content-center sticky top-[calc(100vh-6rem+1px)] min-h-[calc(100vh-6rem+1px)]"
  >
    <div
      :class="visible ? 'w-[17.5rem] px-6 opacity-100' : 'w-0 opacity-0'"
      class="border-r-alice-blue dark:border-r-outer-space dark:bg-charcoal -mt-px flex min-h-full flex-col overflow-hidden border-r bg-white transition-all duration-200"
      @transitionend="handleTransitionEnd"
    >
      <BoardMenu />
      <ThemeSwitcher class="mt-auto" />
      <button
        class="hover:bg-purple-heart/10 group my-8 -ml-12 flex items-center gap-4 text-nowrap rounded-r-3xl py-3.5 pl-12 text-left transition-colors"
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
      class="bg-purple-heart hover:bg-lavender-blue absolute bottom-8 left-0 flex w-14 animate-[slideRight_1s_cubic-bezier(0.22,0.68,0,1)_1] justify-center rounded-r-3xl py-5 transition-all"
      @click="showSlide"
    >
      <img alt="show sidebar" class="-ml-2" src="/assets/icons/icon-show-sidebar.svg" />
    </button>
  </div>
</template>
