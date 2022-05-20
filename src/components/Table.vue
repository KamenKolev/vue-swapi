<script setup lang="ts">
import { computed, ref, VNode } from "vue"
import {
	sortingDirection,
	toggleSortingDirection,
	getInvertedSortingFn,
} from "../utils/sort"
import type { sortingFn } from "../utils/sort"

export type ColumnDefinition<T extends object = any> = {
	label: string
	sortingFn?: sortingFn<T>
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
export type TableProps<
	T extends Record<string, unknown> = Record<keyof string, any>,
> = {
	values: ReadonlyArray<T>
	idKey?: any // default is .id
	columns: ReadonlyArray<ColumnDefinition<T>>
}

const props = defineProps<TableProps>()

const sortDirection = ref<sortingDirection>(null)
const sortFn = ref<sortingFn>(() => 0)

function sortByCol(col: ColumnDefinition) {
	if (sortFn.value === col.sortingFn) {
		sortDirection.value = toggleSortingDirection(sortDirection.value)
	} else {
		sortDirection.value = "ASC"
		sortFn.value = col.sortingFn ? col.sortingFn : () => 0
	}
}
const sortedValues = computed(() => {
	switch (sortDirection.value) {
		case "ASC":
			return [...props.values].sort(sortFn.value)

		case "DESC":
			return [...props.values].sort(getInvertedSortingFn(sortFn.value))

		case null:
			return props.values
	}
})
</script>

<template>
	<table>
		<thead>
			<tr>
				<th v-for="col of columns" @click="() => sortByCol(col)">
					<span>{{ col.label }}</span>
					<span v-if="sortFn === col.sortingFn">{{ sortDirection }}</span>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="value in sortedValues" :key="value?.[(idKey as any)]">
				<td
					v-for="col in columns"
					:key="
						typeof col.getValue?.(value) === 'string'
							? col.getValue(value) as string
							: undefined
					"
				>
					{{ col.getValue?.(value) }}

					<slot v-if="col && col.slot" :name="col.slot" :item="value"> </slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
.table {
	width: 100%;
}
tr {
	height: 40px;
	display: grid;
	/* Issue -> styling per row is duuumb */
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
}
td,
th {
	text-align: start;
}
</style>
