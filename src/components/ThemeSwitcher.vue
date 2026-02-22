<script lang="ts" setup>
import { computed } from "vue";
import { useThemeStore as useTheme } from "@/stores/theme";

const theme = useTheme();

const isDark = computed({
  get: () => theme.currentTheme === "dark",
  set: (val) => theme.setTheme(val ? "dark" : "light"),
});
</script>

<template>
  <div
    class="bg-alice-blue dark:bg-gunmetal flex items-center justify-center gap-x-4 rounded-md py-4"
  >
    <img alt="light theme" class="aspect-square h-5" src="/assets/icons/icon-light-theme.svg" />
    <label class="cursor-pointer">
      <input v-model="isDark" class="peer sr-only" type="checkbox" />
      <div
        class="bg-purple-heart peer relative h-6 w-11 rounded-full after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:ease-in-out after:content-[''] peer-checked:bg-purple-heart peer-checked:after:translate-x-full hover:bg-lavender-blue"
      ></div>
    </label>
    <img alt="dark theme" class="aspect-square h-4" src="/assets/icons/icon-dark-theme.svg" />
  </div>
</template>
