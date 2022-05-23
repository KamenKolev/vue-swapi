<script setup lang="ts">
import { ref } from "vue"
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/vue/solid"
import {
  SortingDirection,
  SortingFn,
  toggleSortingDirection,
  getSortingFunction,
} from "../utils/sort"
import { ColumnDefinition } from "./genericTableTypes"

defineProps<{
  columns: ColumnDefinition[]
}>()

const emit = defineEmits<{
  (event: "sort", sortingFn: SortingFn): void
}>()

const sortDirection = ref<SortingDirection>(null)
const sortFn = ref<SortingFn>(() => 0)

function handleSort(col: ColumnDefinition) {
  if (sortFn.value === col.sortingFn) {
    sortDirection.value = toggleSortingDirection(sortDirection.value)
  } else {
    sortDirection.value = "ASC"
    sortFn.value = col.sortingFn ? col.sortingFn : () => 0
  }

  emit("sort", getSortingFunction(sortFn.value, sortDirection.value))
}
</script>

<template>
  <thead>
    <tr>
      <th
        v-for="col of columns"
        @click="() => handleSort(col)"
        :style="col.styles ?? {}"
        class="dark:hover-bg-gray-800 sticky top-0 z-10 cursor-pointer select-none bg-gray-100 py-4 px-6 text-left font-medium hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-banana dark:hover:text-black"
      >
        <span>{{ col.label }}</span>
        <template v-if="sortFn === col.sortingFn">
          <SortAscendingIcon
            v-if="sortDirection === 'ASC'"
            class="absolute right-1 mt-2 inline h-4 w-4"
          />
          <SortDescendingIcon
            v-else-if="sortDirection === 'DESC'"
            class="absolute right-1 mt-2 inline h-4 w-4"
          />
        </template>
      </th>
    </tr>
  </thead>
</template>
