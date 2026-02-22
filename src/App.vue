<script lang="ts" setup>
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import Columns from "./components/Columns.vue";
import TaskModal from "./components/TaskModal.vue";
import TaskFormModal from "./components/TaskFormModal.vue";
</script>

<template>
  <div class="bg-baby-blue dark:bg-gunmetal relative transition-colors">
    <Nav />
    <div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar class="hidden md:flex" />
      <Columns />
    </div>
    <TaskModal />
    <TaskFormModal />
  </div>
</template>
