<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useThemeStore as useTheme } from "@/stores/theme";

// composable
const theme = useTheme();

// states
const checked = ref(false);

watch(checked, (newChecked) => {
  theme.setTheme(newChecked ? "dark" : "light");
});

onMounted(() => {
  checked.value = theme.currentTheme === "dark";
});
</script>

<template>
  <div
    class="bg-alice-blue dark:bg-gunmetal flex items-center justify-center gap-x-4 rounded-md py-4"
  >
    <img alt="light theme" class="aspect-square h-5" src="/assets/icons/icon-light-theme.svg" />
    <label class="cursor-pointer">
      <input v-model="checked" class="peer sr-only" type="checkbox" />
      <div
        class="after:border-bg-purple-heart dark:border-bg-purple-heart bg-purple-heart dark:bg-purple-heart peer relative h-6 w-11 rounded-full after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:ease-in-out after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"
      ></div>
    </label>
    <img alt="light theme" class="aspect-square h-4" src="/assets/icons/icon-dark-theme.svg" />
  </div>
</template>
