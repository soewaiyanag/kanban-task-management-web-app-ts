import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { initialState } from "@/constants/initialState";

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}

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
    taskIndex,
    updatedTask,
  }: {
    taskIndex: number;
    updatedTask: Partial<Task>;
  }) {
    const board = boards.value[currentBoardIndex.value];
    for (const column of board.columns) {
      const task = column.tasks[taskIndex];
      if (task) {
        Object.assign(task, updatedTask);
        break;
      }
    }
  }

  function addTask(task: Task) {
    boards.value[currentBoardIndex.value].columns[0].tasks.push(task);
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
