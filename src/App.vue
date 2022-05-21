<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getAllPlanets } from "./planet/planet.service"
import type { Planet } from "./planet/planet.type"
import { getAllPeople } from "./person/person.service"
import type { Person } from "./person/person.type"
import PersonTable from "./person/PersonTable.vue"

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
</script>

<template>
	<main class="bg-white text-black dark:bg-black dark:text-white">
		<input
			type="text"
			v-model="searchString"
			class="w-64 border border-inherit bg-inherit p-4 text-inherit"
			placeholder="Fitler by name"
		/>

		<PersonTable :planets="planets ?? []" :people="filteredPeople ?? []" />
	</main>
</template>

<style scoped>
main {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	padding: 1rem;
	display: grid;
	/* TODO revisit */
	grid-template-areas:
		"input"
		"table";
	grid-template-rows: 40px 1fr;
	grid-template-columns: 1fr;
	gap: 1rem;
	position: relative;
	justify-items: center;
}

button {
	text-align: start;
}

input {
	grid-area: input;
}

.table {
	grid-area: table;
	overflow: auto;
	display: block;
	display: flex;
	flex-direction: column;
}

button {
	/* TODO */
	/* height: 32px;
	width: 32px; */

	/* makes corners non-clickable */
	/* border-radius: 50%; */
	/* overflow: hidden; */
}

.planetIcon {
	object-fit: contain;
	max-height: 100%;
	max-width: 100%;
	display: block;
}
</style>
