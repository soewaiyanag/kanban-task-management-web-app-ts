<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Nav from "@/components/Nav.vue";
import Sidebar from "@/components/Sidebar.vue";
import Columns from "@/components/Columns.vue";
import TaskModal from "@/components/TaskModal.vue";
import TaskFormModal from "@/components/TaskFormModal.vue";
import BoardFormModal from "@/components/BoardFormModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import { useBoardStore } from "@/stores/board";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// The URL slug for the currently active board
const currentSlug = computed(() => {
  const board = boardStore.currentBoard;
  return board ? slugify(board.name) : "";
});

// Route → Store: when the URL slug changes, sync currentBoardIndex
// (declared first so it fires before the slug watcher on immediate)
watch(
  () => route.params.slug as string,
  (slug) => {
    if (!slug) {
      // /board with no slug — redirect to first board
      if (boardStore.boards.length > 0) {
        router.replace(`/board/${slugify(boardStore.boards[0].name)}`);
      }
      return;
    }
    const idx = boardStore.boards.findIndex((b) => slugify(b.name) === slug);
    if (idx !== -1 && idx !== boardStore.currentBoardIndex) {
      boardStore.updateCurrentBoardIndex(idx);
    }
  },
  { immediate: true },
);

// Store → Route: when current board changes (selection, rename, add, delete),
// keep the URL in sync
watch(currentSlug, (slug) => {
  if (slug && route.params.slug !== slug) {
    router.replace(`/board/${slug}`);
  }
});

// ESC: close the topmost open modal
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
  <div class="relative min-h-screen bg-baby-blue transition-colors dark:bg-gunmetal">
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
