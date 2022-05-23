<script setup lang="ts">
import { computed, CSSProperties, ref } from "vue"
import {
  sortingDirection,
  toggleSortingDirection,
  getInvertedSortingFn,
} from "../utils/sort"
import type { sortingFn } from "../utils/sort"
import Skeleton from "./Skeleton.vue"
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/vue/solid"

/**
 * Content can be rendered either through getValue, or using projection(slot)
 */
export type ColumnDefinition<T extends object = any> = {
  label: string
  sortingFn?: sortingFn<T>
  styles?: CSSProperties
} & (
  | {
      getValue: (entity: T) => string
      slot?: undefined // makes life easier afterwards
    }
  | {
      getValue?: undefined
      slot: string
    }
)

export type TableSlotData<T> = {
  item: T
}

/**
 * Use this in order to properly type the component
 */
export type TableProps<T extends Record<string, unknown> = any> = {
  values?: ReadonlyArray<T>
  idKey?: any // default is .id
  columns: ReadonlyArray<ColumnDefinition<T>>
}

const props = defineProps<TableProps>()

const sortDirection = ref<sortingDirection>(null)
const sortFn = ref<sortingFn>(() => 0)
const tbodyRef = ref<HTMLTableSectionElement | null>(null)

const isSkeleton = computed(() => props.values === undefined)
const skeletonRowNumber = 10

function sortByCol(col: ColumnDefinition) {
  if (sortFn.value === col.sortingFn) {
    sortDirection.value = toggleSortingDirection(sortDirection.value)
  } else {
    sortDirection.value = "ASC"
    sortFn.value = col.sortingFn ? col.sortingFn : () => 0
  }

  // scroll to top
  if (tbodyRef.value) {
    tbodyRef.value.rows[0].scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }
}
const sortedValues = computed(() => {
  switch (sortDirection.value) {
    case "ASC":
      return [...(props.values ?? [])].sort(sortFn.value)

    case "DESC":
      return [...(props.values ?? [])].sort(getInvertedSortingFn(sortFn.value))

    case null:
      return props.values
  }
})
</script>

<template>
  <table
    class="custom-scrollbar block w-full max-w-max overflow-x-auto whitespace-nowrap"
  >
    <thead>
      <tr>
        <th
          v-for="col of columns"
          @click="() => sortByCol(col)"
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
    <tbody ref="tbodyRef">
      <tr v-if="isSkeleton" v-for="skeleton in skeletonRowNumber">
        <td
          v-for="col in columns"
          :style="{ ...(col.styles ?? {}), height: '72.8px' }"
          class="p-4"
        >
          <Skeleton />
        </td>
      </tr>

      <tr v-else v-for="value in sortedValues" :key="value?.[(idKey as any)]">
        <td
          v-for="col in columns"
          :style="col.styles"
          :key="
						typeof col.getValue?.(value) === 'string'
							? col.getValue(value) as string
							: undefined
					"
          class="p-4"
        >
          {{ col.getValue?.(value) }}
          <slot v-if="col && col.slot" :name="col.slot" :item="value"> </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
