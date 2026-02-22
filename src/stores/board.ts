import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { initialState } from "@/constants/initialState";
import type { Board, Task } from "@/types/board";

export type { Subtask, Task, Column, Board } from "@/types/board";

export const useBoardStore = defineStore("board", () => {
  // Reactive state properties
  const boards = ref<Board[]>(JSON.parse(JSON.stringify(initialState)));
  const currentBoardIndex = ref<number>(0);
  const selectedTask = ref<Task | null>(null);
  const taskFormMode = ref<"add" | "edit" | null>(null);

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

  function openAddTask() {
    taskFormMode.value = "add";
  }

  function openEditTask() {
    taskFormMode.value = "edit";
  }

  function closeTaskForm() {
    taskFormMode.value = null;
  }

  function openTask(task: Task) {
    selectedTask.value = task;
  }

  function closeTask() {
    selectedTask.value = null;
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
    selectedTask,
    taskFormMode,
    boardNames,
    currentBoard,
    currentTasks,
    updateCurrentBoardIndex,
    openAddTask,
    openEditTask,
    closeTaskForm,
    openTask,
    closeTask,
    updateTask,
    addTask,
  };
});
