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
	<main
		class="relative flex h-screen w-screen flex-col items-center justify-items-center gap-4 overflow-hidden bg-white py-4 text-black dark:bg-black dark:text-white md:px-4"
	>
		<input
			type="text"
			v-model="searchString"
			class="w-64 border border-inherit bg-inherit p-2 text-inherit"
			placeholder="Fitler by name"
		/>

		<PersonTable :planets="planets ?? []" :people="filteredPeople ?? []" />
	</main>
</template>
