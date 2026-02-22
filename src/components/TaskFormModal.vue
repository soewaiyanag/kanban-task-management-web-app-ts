<script lang="ts" setup>
import { reactive, computed, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const { taskFormMode, selectedTask, currentBoard } = storeToRefs(boardStore);

const isEdit = computed(() => taskFormMode.value === "edit");
const submitted = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);

const form = reactive({
  title: "",
  description: "",
  subtasks: [] as { title: string; isCompleted: boolean }[],
  status: "",
});

watch(
  taskFormMode,
  (mode) => {
    submitted.value = false;
    if (mode === "add") {
      form.title = "";
      form.description = "";
      form.subtasks = [
        { title: "", isCompleted: false },
        { title: "", isCompleted: false },
      ];
      form.status = currentBoard.value?.columns[0]?.name ?? "";
    } else if (mode === "edit" && selectedTask.value) {
      form.title = selectedTask.value.title;
      form.description = selectedTask.value.description;
      form.subtasks = selectedTask.value.subtasks.map((s) => ({ ...s }));
      form.status = selectedTask.value.status;
    }
  },
  { immediate: true },
);

function addSubtask() {
  form.subtasks.push({ title: "", isCompleted: false });
}

function removeSubtask(index: number) {
  form.subtasks.splice(index, 1);
}

function submit() {
  submitted.value = true;
  if (!form.title.trim()) {
    titleInput.value?.focus();
    return;
  }
  if (form.subtasks.some((s) => !s.title.trim())) return;
  if (isEdit.value && selectedTask.value) {
    Object.assign(selectedTask.value, {
      title: form.title,
      description: form.description,
      subtasks: form.subtasks,
      status: form.status,
    });
  } else {
    boardStore.addTask({
      title: form.title,
      description: form.description,
      status: form.status,
      subtasks: form.subtasks.map((s) => ({ title: s.title, isCompleted: false })),
    });
  }
  boardStore.closeTaskForm();
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="taskFormMode"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click="boardStore.closeTaskForm()"
    >
      <div
        class="w-[480px] max-h-[90vh] overflow-y-auto rounded-[6px] bg-white p-8 dark:bg-charcoal"
        @click.stop
      >
        <!-- Heading -->
        <h2 class="heading-l mb-6 text-midnight dark:text-white">
          {{ isEdit ? "Edit Task" : "Add New Task" }}
        </h2>

        <!-- Title -->
        <div>
          <label class="body-m mb-2 block text-battleship-grey">Title</label>
          <input
            ref="titleInput"
            v-model="form.title"
            type="text"
            :placeholder="isEdit ? '' : 'e.g. Take coffee break'"
            :class="submitted && !form.title.trim() ? 'border-red-orange' : 'border-[rgba(130,143,163,0.25)]'"
            class="body-l h-10 w-full rounded-[4px] border bg-white px-4 text-midnight placeholder:opacity-25 focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white dark:placeholder:text-white"
          />
        </div>

        <!-- Description -->
        <div class="mt-6">
          <label class="body-m mb-2 block text-battleship-grey">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            class="body-l w-full resize-none rounded-[4px] border border-[rgba(130,143,163,0.25)] bg-white px-4 py-2 text-midnight placeholder:opacity-25 focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white dark:placeholder:text-white"
          />
        </div>

        <!-- Subtasks -->
        <div class="mt-6">
          <label class="body-m mb-2 block text-battleship-grey">Subtasks</label>
          <div class="space-y-3">
            <div
              v-for="(subtask, i) in form.subtasks"
              :key="i"
              class="flex items-center gap-4"
            >
              <div class="relative flex-1">
                <input
                  v-model="subtask.title"
                  type="text"
                  :placeholder="i === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'"
                  :class="submitted && !subtask.title.trim() ? 'border-red-orange pr-32' : 'border-[rgba(130,143,163,0.25)]'"
                  class="body-l h-10 w-full rounded-[4px] border bg-white px-4 text-midnight placeholder:opacity-25 focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white dark:placeholder:text-white"
                />
                <span
                  v-if="submitted && !subtask.title.trim()"
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 body-l text-red-orange"
                >
                  Can't be empty
                </span>
              </div>
              <button
                type="button"
                :class="submitted && !subtask.title.trim() ? 'opacity-100' : 'opacity-60 hover:opacity-100'"
                class="shrink-0 transition-opacity"
                @click="removeSubtask(i)"
              >
                <img
                  alt="remove subtask"
                  src="/assets/icons/icon-cross.svg"
                  :class="submitted && !subtask.title.trim() ? '[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(97%)_saturate(600%)_hue-rotate(315deg)_brightness(95%)]' : ''"
                />
              </button>
            </div>
          </div>
          <button
            type="button"
            class="body-l mt-3 h-10 w-full rounded-[20px] bg-purple-heart/10 text-purple-heart transition-colors hover:bg-purple-heart/25"
            @click="addSubtask"
          >
            + Add New Subtask
          </button>
        </div>

        <!-- Status -->
        <div class="mt-6">
          <label class="body-m mb-2 block text-battleship-grey">Status</label>
          <div class="relative">
            <select
              v-model="form.status"
              class="body-l h-10 w-full cursor-pointer appearance-none rounded-[4px] border border-[rgba(130,143,163,0.25)] bg-white px-4 text-midnight focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white"
            >
              <option
                v-for="col in currentBoard.columns"
                :key="col.name"
                :value="col.name"
              >{{ col.name }}</option>
            </select>
            <img
              alt=""
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              src="/assets/icons/icon-chevron-down.svg"
            />
          </div>
        </div>

        <!-- Submit -->
        <button
          type="button"
          class="body-l mt-6 h-10 w-full rounded-[20px] bg-purple-heart text-white transition-colors hover:bg-lavender-blue"
          @click="submit"
        >
          {{ isEdit ? "Save Changes" : "Create Task" }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
