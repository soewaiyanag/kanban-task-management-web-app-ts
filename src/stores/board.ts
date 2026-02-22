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
  const boardFormMode = ref<"add" | "edit" | null>(null);
  const deleteTarget = ref<"board" | "task" | null>(null);

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

  // Task form
  function openAddTask() {
    taskFormMode.value = "add";
  }

  function openEditTask() {
    taskFormMode.value = "edit";
  }

  function closeTaskForm() {
    taskFormMode.value = null;
  }

  // Task view
  function openTask(task: Task) {
    selectedTask.value = task;
  }

  function closeTask() {
    selectedTask.value = null;
  }

  // Add task
  function addTask(task: Task) {
    const board = boards.value[currentBoardIndex.value];
    const targetColumn =
      board.columns.find((col) => col.name === task.status) ?? board.columns[0];
    targetColumn.tasks.push(task);
  }

  // Board form
  function openAddBoard() {
    boardFormMode.value = "add";
  }

  function openEditBoard() {
    boardFormMode.value = "edit";
  }

  function closeBoardForm() {
    boardFormMode.value = null;
  }

  function addBoard(name: string, columnNames: string[]) {
    const newBoard: Board = {
      name,
      columns: columnNames.map((colName) => ({ name: colName, tasks: [] })),
    };
    boards.value.push(newBoard);
    currentBoardIndex.value = boards.value.length - 1;
  }

  function saveBoard(name: string, columnMappings: { originalName: string; name: string }[]) {
    const board = boards.value[currentBoardIndex.value];
    board.name = name;
    const existingByName = new Map(board.columns.map((col) => [col.name, col]));
    board.columns = columnMappings.map(({ originalName, name: newName }) => {
      const existing = existingByName.get(originalName);
      return existing
        ? { name: newName, tasks: existing.tasks }
        : { name: newName, tasks: [] };
    });
  }

  // Delete
  function openDeleteBoard() {
    deleteTarget.value = "board";
  }

  function openDeleteTask() {
    deleteTarget.value = "task";
  }

  function closeDelete() {
    deleteTarget.value = null;
  }

  function confirmDeleteBoard() {
    boards.value.splice(currentBoardIndex.value, 1);
    currentBoardIndex.value = Math.max(0, currentBoardIndex.value - 1);
    deleteTarget.value = null;
  }

  function confirmDeleteTask() {
    if (!selectedTask.value) return;
    const board = boards.value[currentBoardIndex.value];
    for (const col of board.columns) {
      const idx = col.tasks.indexOf(selectedTask.value);
      if (idx !== -1) {
        col.tasks.splice(idx, 1);
        break;
      }
    }
    selectedTask.value = null;
    deleteTarget.value = null;
  }

  return {
    boards,
    currentBoardIndex,
    selectedTask,
    taskFormMode,
    boardFormMode,
    deleteTarget,
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
    openAddBoard,
    openEditBoard,
    closeBoardForm,
    addBoard,
    saveBoard,
    openDeleteBoard,
    openDeleteTask,
    closeDelete,
    confirmDeleteBoard,
    confirmDeleteTask,
  };
});
