<script lang="ts" setup>
import { reactive, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const { boardFormMode, currentBoard } = storeToRefs(boardStore);

const isEdit = computed(() => boardFormMode.value === "edit");

const form = reactive({
  name: "",
  columns: [] as string[],
});

watch(
  boardFormMode,
  (mode) => {
    if (mode === "add") {
      form.name = "";
      form.columns = ["Todo", "Doing"];
    } else if (mode === "edit" && currentBoard.value) {
      form.name = currentBoard.value.name;
      form.columns = currentBoard.value.columns.map((c) => c.name);
    }
  },
  { immediate: true },
);

function addColumn() {
  form.columns.push("");
}

function removeColumn(index: number) {
  form.columns.splice(index, 1);
}

function submit() {
  if (!form.name.trim()) return;
  const cols = form.columns.filter((c) => c.trim());
  if (isEdit.value) {
    boardStore.saveBoard(form.name.trim(), cols);
  } else {
    boardStore.addBoard(form.name.trim(), cols);
  }
  boardStore.closeBoardForm();
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="boardFormMode"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click="boardStore.closeBoardForm()"
    >
      <div
        class="w-[480px] max-h-[90vh] overflow-y-auto rounded-[6px] bg-white p-8 dark:bg-charcoal"
        @click.stop
      >
        <!-- Heading -->
        <h2 class="heading-l mb-6 text-midnight dark:text-white">
          {{ isEdit ? "Edit Board" : "Add New Board" }}
        </h2>

        <!-- Name -->
        <div>
          <label class="body-m mb-2 block text-battleship-grey">
            {{ isEdit ? "Board Name" : "Name" }}
          </label>
          <input
            v-model="form.name"
            type="text"
            :placeholder="isEdit ? '' : 'e.g. Web Design'"
            class="body-l h-10 w-full rounded-[4px] border border-[rgba(130,143,163,0.25)] bg-white px-4 text-midnight placeholder:opacity-25 focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white dark:placeholder:text-white"
          />
        </div>

        <!-- Columns -->
        <div class="mt-6">
          <label class="body-m mb-2 block text-battleship-grey">
            {{ isEdit ? "Board Columns" : "Columns" }}
          </label>
          <div class="space-y-3">
            <div
              v-for="(_, i) in form.columns"
              :key="i"
              class="flex items-center gap-4"
            >
              <input
                v-model="form.columns[i]"
                type="text"
                class="body-l h-10 flex-1 rounded-[4px] border border-[rgba(130,143,163,0.25)] bg-white px-4 text-midnight placeholder:opacity-25 focus:border-purple-heart focus:outline-none dark:bg-charcoal dark:text-white dark:placeholder:text-white"
              />
              <button
                type="button"
                class="shrink-0 opacity-60 transition-opacity hover:opacity-100"
                @click="removeColumn(i)"
              >
                <img alt="remove column" src="/assets/icons/icon-cross.svg" />
              </button>
            </div>
          </div>
          <button
            type="button"
            class="body-l mt-3 h-10 w-full rounded-[20px] bg-purple-heart/10 text-purple-heart transition-colors hover:bg-purple-heart/25"
            @click="addColumn"
          >
            + Add New Column
          </button>
        </div>

        <!-- Submit -->
        <button
          type="button"
          class="body-l mt-6 h-10 w-full rounded-[20px] bg-purple-heart text-white transition-colors hover:bg-lavender-blue"
          @click="submit"
        >
          {{ isEdit ? "Save Changes" : "Create New Board" }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
