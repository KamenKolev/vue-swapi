<script setup lang="ts">
import { computed, h, onMounted, ref } from "vue"
import { getAllPlanets, Planet } from "./data/planets.service"
import Table, { ColumnDefinition, TableProps } from "./components/Table.vue"
// import Table from "./components/Table.tsx"
import type { TableSlotData } from "./components/Table.vue"
import { getAllPeople } from "./data/people.service"
import type { Person } from "./data/people.service"

const planets = ref<undefined | Planet[]>(undefined)
const people = ref<undefined | Person[]>(undefined)

onMounted(() => {
	getAllPlanets().then(res => (planets.value = res))
	getAllPeople().then(res => (people.value = res))
})

const searchString = ref("")

const tableProps = computed<TableProps>(() => {
	const filteredPeople = people.value?.filter(person =>
		person.name.toLowerCase().includes(searchString.value.trim().toLowerCase()),
	)

	const colDefs: ColumnDefinition<Person>[] = [
		{ getValue: ({ name }) => name, label: "Name" },
		{
			getValue: ({ height }) => String(height),
			label: "Height",
		},
		{ getValue: ({ mass }) => String(mass), label: "Mass" },
		{
			getValue: ({ created }) =>
				new Intl.DateTimeFormat("en-gb").format(new Date(created)),
			label: "Created",
		},
		{
			getValue: ({ edited }) =>
				new Intl.DateTimeFormat("en-gb").format(new Date(edited)),
			label: "Edited",
		},
		{
			slot: "homeworld",
			label: "homeworld",
		},
	]
	return {
		values: filteredPeople,
		columns: colDefs,
		key: "id",
	}
})
</script>

<template>
	<main>
		<input type="text" v-model="searchString" />
		<!-- @ts-ignore -->
		<Table
			class="table"
			v-if="tableProps.values"
			:values="tableProps.values"
			:columns="tableProps.columns"
			:key="'id'"
		>
			<!-- <template v-slot:item.homeworld="{ item }"> -->
			<template #homeworld="{ item }: TableSlotData<Person>">
				<span> HOMEWORLD {{ item.homeworld }} </span>
			</template>
		</Table>
	</main>
</template>

<style scoped>
/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
} */

input {
	border: 1px solid black;
	border-radius: 2px;
}

main {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	padding: 2rem;
	display: grid;

	/* display: flex;
	flex-direction: column;
	align-items: center; */
}

.table {
	max-width: 1000px;
}
</style>
