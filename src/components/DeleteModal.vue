<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const { deleteTarget, currentBoard, selectedTask } = storeToRefs(boardStore);

const title = computed(() =>
  deleteTarget.value === "board" ? "Delete this board?" : "Delete this task?",
);

const body = computed(() => {
  if (deleteTarget.value === "board") {
    return `Are you sure you want to delete the '${currentBoard.value?.name}' board? This action will remove all columns and tasks and cannot be reversed.`;
  }
  return `Are you sure you want to delete the '${selectedTask.value?.title}' task and its subtasks? This action cannot be reversed.`;
});

function confirm() {
  if (deleteTarget.value === "board") {
    boardStore.confirmDeleteBoard();
  } else {
    boardStore.confirmDeleteTask();
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        @click="boardStore.closeDelete()"
      >
      <div
        class="modal-card w-full rounded-[6px] bg-white p-6 dark:bg-charcoal md:w-[480px] md:p-8"
        @click.stop
      >
        <h2 class="heading-l mb-6 text-red-orange">{{ title }}</h2>
        <p class="body-l text-battleship-grey">{{ body }}</p>
        <div class="mt-6 flex gap-4">
          <button
            type="button"
            class="body-l h-10 flex-1 rounded-[20px] bg-red-orange text-white transition-colors hover:bg-pink-salmon"
            @click="confirm"
          >
            Delete
          </button>
          <button
            type="button"
            class="body-l h-10 flex-1 rounded-[20px] bg-baby-blue text-purple-heart transition-colors hover:bg-purple-heart/25 dark:bg-gunmetal"
            @click="boardStore.closeDelete()"
          >
            Cancel
          </button>
        </div>
      </div>
      </div>
    </Transition>
  </Teleport>
</template>
