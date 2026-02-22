<script lang="ts" setup></script>

<template>
  <button
    class="bg-purple-heart hover:bg-lavender-blue disabled:hover:bg-purple-heart flex cursor-pointer items-center gap-1.5 rounded-3xl px-5 py-4 transition-colors disabled:cursor-not-allowed disabled:opacity-25"
  >
    <slot />
  </button>
</template>
