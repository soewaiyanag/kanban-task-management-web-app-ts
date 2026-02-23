<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const { selectedTask: task, currentBoard } = storeToRefs(boardStore);
const isEllipsisOpen = ref(false);
const isStatusOpen = ref(false);
const statusButtonRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref<Record<string, string>>({});

const completedCount = computed(
  () => task.value?.subtasks.filter((s) => s.isCompleted).length ?? 0,
);

function openStatusDropdown() {
  if (statusButtonRef.value) {
    const rect = statusButtonRef.value.getBoundingClientRect();
    dropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    };
  }
  isStatusOpen.value = true;
}

function selectStatus(colName: string) {
  if (!task.value) return;
  boardStore.changeTaskStatus(task.value, colName);
  isStatusOpen.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="task"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        @click="boardStore.closeTask()"
      >
        <div
          class="modal-card relative w-full max-h-[90vh] overflow-y-auto rounded-[6px] bg-white p-6 dark:bg-charcoal md:w-[480px] md:p-8"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-6">
            <h2 class="heading-l text-midnight dark:text-white">{{ task.title }}</h2>
            <!-- Ellipsis menu -->
            <div class="relative mt-1 shrink-0">
              <div
                v-if="isEllipsisOpen"
                class="fixed inset-0"
                @click="isEllipsisOpen = false"
              />
              <button class="relative z-10" @click="isEllipsisOpen = !isEllipsisOpen">
                <img alt="task options" src="/assets/icons/icon-vertical-ellipsis.svg" />
              </button>
              <Transition name="dropdown">
                <div
                  v-if="isEllipsisOpen"
                  class="absolute right-0 top-full z-10 mt-4 w-48 rounded-lg bg-white py-4 shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-gunmetal"
                >
                  <button
                    class="body-l w-full px-4 py-2 text-left text-battleship-grey transition-colors hover:text-midnight dark:hover:text-white"
                    @click="() => { boardStore.openEditTask(); isEllipsisOpen = false; }"
                  >
                    Edit Task
                  </button>
                  <button
                    class="body-l w-full px-4 py-2 text-left text-red-orange transition-colors hover:text-pink-salmon"
                    @click="() => { boardStore.openDeleteTask(); isEllipsisOpen = false; }"
                  >
                    Delete Task
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Description -->
          <p v-if="task.description" class="body-l mt-6 text-battleship-grey">
            {{ task.description }}
          </p>

          <!-- Subtasks -->
          <div class="mt-6">
            <p class="body-m mb-4 text-battleship-grey dark:text-white">
              Subtasks ({{ completedCount }} of {{ task.subtasks.length }})
            </p>
            <div class="space-y-2">
              <label
                v-for="(subtask, i) in task.subtasks"
                :key="i"
                class="flex cursor-pointer items-center gap-4 rounded-[4px] bg-baby-blue px-3 py-3 transition-colors hover:bg-purple-heart/25 dark:bg-gunmetal dark:hover:bg-purple-heart/25"
              >
                <input
                  type="checkbox"
                  :checked="subtask.isCompleted"
                  class="sr-only"
                  @change="subtask.isCompleted = !subtask.isCompleted"
                />
                <div
                  :class="[
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px]',
                    subtask.isCompleted
                      ? 'bg-purple-heart'
                      : 'border border-[rgba(130,143,163,0.25)] bg-white dark:bg-charcoal',
                  ]"
                >
                  <img
                    v-if="subtask.isCompleted"
                    alt=""
                    class="block"
                    src="/assets/icons/icon-check.svg"
                  />
                </div>
                <span
                  :class="[
                    'body-m text-midnight dark:text-white',
                    subtask.isCompleted && 'opacity-50 line-through',
                  ]"
                >{{ subtask.title }}</span>
              </label>
            </div>
          </div>

          <!-- Current Status — custom dropdown -->
          <div class="mt-6">
            <p class="body-m mb-4 text-battleship-grey dark:text-white">Current Status</p>
            <div class="relative">
              <div
                v-if="isStatusOpen"
                class="fixed inset-0 z-[59]"
                @click="isStatusOpen = false"
              />
              <button
                ref="statusButtonRef"
                type="button"
                class="body-l flex h-10 w-full cursor-pointer items-center justify-between rounded-[4px] border bg-white px-4 text-midnight transition-colors focus:outline-none dark:bg-charcoal dark:text-white"
                :class="isStatusOpen ? 'border-purple-heart' : 'border-[rgba(130,143,163,0.25)] hover:border-purple-heart'"
                @click="openStatusDropdown"
              >
                <span>{{ task.status }}</span>
                <img
                  alt=""
                  src="/assets/icons/icon-chevron-down.svg"
                  class="transition-transform duration-200"
                  :class="isStatusOpen ? 'rotate-180' : ''"
                />
              </button>
              <Teleport to="body">
                <Transition name="dropdown">
                  <div
                    v-if="isStatusOpen"
                    :style="dropdownStyle"
                    class="fixed z-[60] rounded-lg bg-white py-4 shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-gunmetal"
                  >
                    <button
                      v-for="col in currentBoard.columns"
                      :key="col.name"
                      type="button"
                      class="body-l w-full px-4 py-2 text-left text-battleship-grey transition-colors hover:text-purple-heart"
                      @click="selectStatus(col.name)"
                    >
                      {{ col.name }}
                    </button>
                  </div>
                </Transition>
              </Teleport>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
