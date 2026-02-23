<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import Columns from "./components/Columns.vue";
import TaskModal from "./components/TaskModal.vue";
import TaskFormModal from "./components/TaskFormModal.vue";
import BoardFormModal from "./components/BoardFormModal.vue";
import DeleteModal from "./components/DeleteModal.vue";
import { useBoardStore } from "./stores/board";

const boardStore = useBoardStore();

function onKeydown(e: KeyboardEvent) {
  if (e.key !== "Escape") return;
  if (boardStore.deleteTarget) { boardStore.closeDelete(); return; }
  if (boardStore.taskFormMode) { boardStore.closeTaskForm(); return; }
  if (boardStore.boardFormMode) { boardStore.closeBoardForm(); return; }
  if (boardStore.selectedTask) { boardStore.closeTask(); return; }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="bg-baby-blue dark:bg-gunmetal relative min-h-screen transition-colors">
    <Nav />
    <div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar class="hidden md:flex" />
      <Columns />
    </div>
    <TaskModal />
    <TaskFormModal />
    <BoardFormModal />
    <DeleteModal />
  </div>
</template>
