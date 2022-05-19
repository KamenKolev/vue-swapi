<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getAllPlanets, Planet } from "./data/planets.service"
import Table, { ColumnDefinition, TableProps } from "./components/Table.vue"
// import Table from "./components/Table.tsx"

import { getAllPeople, Person } from "./data/people.service"

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
		{ getValue: ({ name }) => name, label: "Name", sorting: null },
		{
			getValue: ({ height }) => String(height),
			label: "Height",
			sorting: null,
		},
		{ getValue: ({ mass }) => String(mass), label: "Mass", sorting: null },
		{
			getValue: ({ created }) =>
				new Intl.DateTimeFormat("en-gb").format(new Date(created)),
			label: "Created",
			sorting: null,
		},
		{
			getValue: ({ edited }) =>
				new Intl.DateTimeFormat("en-gb").format(new Date(edited)),
			label: "Edited",
			sorting: null,
		},
		// TODO
		// { getValue: ({ homeworld }) => homeworld, label: "homeworld", sorting: null },
	]
	return {
		values: filteredPeople,
		columns: colDefs,
		key: "id",
	}
})
</script>

<template>
	<input type="text" v-model="searchString" />
	<!-- @ts-ignore -->
	<Table
		v-if="tableProps.values"
		:values="tableProps.values"
		:columns="tableProps.columns"
		:key="'id'"
	/>
</template>

<style>
/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
} */
</style>
