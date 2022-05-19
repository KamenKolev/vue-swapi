<script setup lang="ts">
export type ColumnDefinition<T extends object = any> = {
	getValue: (entity: T) => string
	label: string
	sorting: "ASC" | "DESC" | null
}
// type keyType = JSX.IntrinsicAttributes["key"]

// TODO find out how to elegantly create generic components
export type TableProps<
	T extends Record<string, unknown> = Record<keyof string, any>,
> = {
	values: ReadonlyArray<T>
	// key?: keyof T // default is .id
	key?: any // default is .id
	columns: ReadonlyArray<ColumnDefinition<T>>
}

function sortByCol(col: ColumnDefinition) {
	// TODO
}

defineProps<TableProps>()
</script>

<template>
	<table>
		<thead>
			<th v-for="col of columns" @click="() => sortByCol(col)">
				<span>{{ col.label }}</span>
				<span v-if="col.sorting">{{
					col.sorting === "ASC" ? "ASC" : "DESC"
				}}</span>
			</th>
		</thead>
		<tbody>
			<tr v-for="value in values" :key="value?.[(key as any)]">
				<td v-for="col in columns" :key="value[col.key]">
					{{ col.getValue(value) }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
