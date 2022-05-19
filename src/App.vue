<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getAllPlanets, Planet } from "./data/planets.service"
import Table, { ColumnDefinition } from "./components/Table.vue"
// import Table from "./components/Table.tsx"

import { getAllPeople, Person } from "./data/people.service"

const planets = ref<undefined | Planet[]>(undefined)
const people = ref<undefined | Person[]>(undefined)

onMounted(() => {
	getAllPlanets().then(res => (planets.value = res))
	getAllPeople().then(res => (people.value = res))
})

const searchString = ref("")
const filteredPeople = computed(() =>
	people.value?.filter(person =>
		person.name.toLowerCase().includes(searchString.value.trim().toLowerCase()),
	),
)
const columns = computed(() => {
	const firstPerson = filteredPeople.value?.[0]

	if (firstPerson) {
		return Object.keys(firstPerson).map((k): ColumnDefinition => {
			return {
				getValue: o => o[k],
				label: k[0].toUpperCase() + k.slice(1),
				sorting: null,
			}
		})
	}
	return []
})
</script>

<template>
	<input type="text" v-model="searchString" />
	<!-- @ts-ignore -->
	<Table
		v-if="filteredPeople"
		:values="filteredPeople"
		:columns="columns"
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
