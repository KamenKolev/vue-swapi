<script setup lang="ts">
import { computed, h, onMounted, ref } from "vue"
import { getAllPlanets, Planet } from "./data/planets.service"
import Table, { ColumnDefinition, TableProps } from "./components/Table.vue"
// import Table from "./components/Table.tsx"
import type { TableSlotData } from "./components/Table.vue"
import { getAllPeople } from "./data/people.service"
import type { Person } from "./data/people.service"
import PlanetDialog from "./components/PlanetDialog.vue"
import { sortByNumber, sortByString, sortWithSelector } from "./utils/sort"

const planets = ref<undefined | Planet[]>(undefined)
const people = ref<undefined | Person[]>(undefined)

onMounted(() => {
	getAllPlanets().then(res => (planets.value = res))
	getAllPeople().then(res => (people.value = res))
})

const dateFormatter = new Intl.DateTimeFormat("en-gb", {
	timeStyle: "short",
	dateStyle: "short",
})

const searchString = ref("")

const tableProps = computed<TableProps>(() => {
	const filteredPeople = people.value?.filter(person =>
		person.name.toLowerCase().includes(searchString.value.trim().toLowerCase()),
	)

	const colDefs: ColumnDefinition<Person>[] = [
		{
			getValue: ({ name }) => name,
			label: "Name",
			sortingFn: sortWithSelector<Person>(({ name }) => name)(sortByString),
		},
		{
			getValue: ({ height }) => String(height),
			label: "Height",
			sortingFn: sortWithSelector<Person>(({ height }) => height)(sortByNumber),
		},
		{
			getValue: ({ mass }) => String(mass),
			label: "Mass",
			sortingFn: sortWithSelector<Person>(({ mass }) => mass)(sortByNumber),
		},
		{
			getValue: ({ created }) => dateFormatter.format(new Date(created)),
			sortingFn: sortWithSelector<Person>(person => {
				if (!person.created.getTime) {
					debugger
				}
				return person.created?.getTime()
			})(sortByNumber),
			label: "Created",
		},
		{
			getValue: ({ edited }) => dateFormatter.format(new Date(edited)),
			sortingFn: sortWithSelector<Person>(({ edited }) => edited?.getTime())(
				sortByNumber,
			),
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

const planetModalIsOpen = ref(false)
const clickedPlanetId = ref()
const modalPlanet = computed(() =>
	// TODO fetch effect
	planets.value?.find(({ id }) => id === clickedPlanetId.value),
)
function handlePlanetClick(planetId: Person["homeworld"]) {
	clickedPlanetId.value = planetId
	planetModalIsOpen.value = true
}
</script>

<template>
	<main>
		<input type="text" v-model="searchString" />
		<Table
			class="table"
			v-if="tableProps.values"
			:values="tableProps.values"
			:columns="tableProps.columns"
			idKey="id"
		>
			<template #homeworld="{ item }: TableSlotData<Person>">
				<button type="button" @click="handlePlanetClick(item.homeworld)">
					<img
						class="planetIcon"
						alt="Planet icon"
						src="./assets/Death-Star-icon_128.png"
					/>
				</button>
				<!-- <span> HOMEWORLD {{ item.homeworld }} </span> -->
			</template>
		</Table>
	</main>

	<PlanetDialog :open="true" :planet="planets?.[0]" />
</template>

<style scoped>
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

button {
	/* TODO */
	height: 32px;
	width: 32px;

	/* makes corners non-clickable */
	border-radius: 50%;
	overflow: hidden;
}

.planetIcon {
	object-fit: contain;
	max-height: 100%;
	max-width: 100%;
	display: block;
}
</style>
