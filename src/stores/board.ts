import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { initialState } from "@/constants/initialState";
import type { Board, Task } from "@/types/board";

export type { Subtask, Task, Column, Board } from "@/types/board";

export const useBoardStore = defineStore("board", () => {
  // Reactive state properties
  const boards = ref<Board[]>(JSON.parse(JSON.stringify(initialState)));
  const currentBoardIndex = ref<number>(0);

  // Computed properties for getters
  const boardNames = computed(() => boards.value.map((board) => board.name));
  const currentBoard = computed(() => boards.value[currentBoardIndex.value]);
  const currentTasks = computed(() => {
    return boards.value[currentBoardIndex.value]?.columns.flatMap((column) => column.tasks) || [];
  });

  // Actions
  function updateCurrentBoardIndex(index: number) {
    currentBoardIndex.value = index;
  }

  function updateTask({
    columnIndex,
    taskIndex,
    updatedTask,
  }: {
    columnIndex: number;
    taskIndex: number;
    updatedTask: Partial<Task>;
  }) {
    const board = boards.value[currentBoardIndex.value];
    const task = board.columns[columnIndex]?.tasks[taskIndex];
    if (task) {
      Object.assign(task, updatedTask);
    }
  }

  function addTask(task: Task) {
    const board = boards.value[currentBoardIndex.value];
    const targetColumn =
      board.columns.find((col) => col.name === task.status) ?? board.columns[0];
    targetColumn.tasks.push(task);
  }

  return {
    boards,
    currentBoardIndex,
    boardNames,
    currentBoard,
    currentTasks,
    updateCurrentBoardIndex,
    updateTask,
    addTask,
  };
});
