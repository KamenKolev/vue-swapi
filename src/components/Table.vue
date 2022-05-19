<script setup lang="ts">
import { computed, ref, VNode } from "vue"

export type sortingFn<T> = (a: T, b: T) => number

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
	key?: any // default is .id
	columns: ReadonlyArray<ColumnDefinition<T>>
}

const toTableSortingFn =
	<T>(fn: sortingFn<T>) =>
	(direction: "ASC" | "DESC"): sortingFn<T> =>
	(a: T, b: T) => {
		const result = fn(a, b)
		if (direction === "ASC") return result
		return -result
	}

// sorting: "ASC" | "DESC" | null
const sortingFns = ref<Array<sortingFn<any>>>()
const finalSortingFn = computed(() => {
	;(a: any, b: any) => {
		const usedSortFunction = sortingFns.value?.find(fn => fn(a, b) !== 0)
		return
	}
})

function sortByCol(col: ColumnDefinition) {
	// TODO
}

defineProps<TableProps>()
</script>

<template>
	<table>
		<thead>
			<tr>
				<th v-for="col of columns" @click="() => sortByCol(col)">
					<span>{{ col.label }}</span>
					<!-- <span v-if="col.sorting">{{
						col.sorting === "ASC" ? "ASC" : "DESC"
					}}</span> -->
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="value in values" :key="value?.[(key as any)]">
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
