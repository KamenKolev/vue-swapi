<script setup lang="ts">
import { computed, ref, useSlots, watch } from "vue"
import type { SortingFn } from "../../utils/sort"
import GenericTableHeader from "./GenericTableHeader.vue"
import GenericTableContent from "./GenericTableContent.vue"
import GenericTableSkeleton from "./GenericTableSkeleton.vue"
import { ColumnDefinition, TableSlotData } from "./types"

export type TableProps<T extends Record<string, unknown> = any> = {
  values?: Array<T>
  columns: Array<ColumnDefinition<T>>
}

const props = defineProps<TableProps>()
const isLoading = computed(() => props.values === undefined)

const tbodyRef = ref<HTMLTableSectionElement | null>(null)
function scrollToTop() {
  const firstRow = tbodyRef.value?.rows?.[0]
  if (firstRow) {
    firstRow.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }
}

const sortingFn = ref<SortingFn>(() => 0)
const sortedValues = computed(() =>
  Array.from(props.values ?? []).sort(sortingFn.value),
)
function handleSort(fn: SortingFn) {
  sortingFn.value = fn
  scrollToTop()
}

const zeroResults = computed(
  () => Array.isArray(props.values) && props.values.length === 0,
)

watch(() => props.values, scrollToTop)

const slots = useSlots()
</script>

<template>
  <table
    class="custom-scrollbar block w-full max-w-max overflow-x-auto whitespace-nowrap"
  >
    <GenericTableHeader :columns="columns" @sort="handleSort" />
    <tbody ref="tbodyRef" :class="zeroResults ? 'flex' : ''">
      <GenericTableSkeleton v-if="isLoading" :columns="columns" />
      <div v-else-if="zeroResults" class="w-full py-16 text-center text-2xl">
        No results
      </div>
      <GenericTableContent
        v-else
        :columns="columns"
        :values="sortedValues ?? []"
      >
        <template v-for="(_, slot) of slots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </GenericTableContent>
    </tbody>
  </table>
</template>
