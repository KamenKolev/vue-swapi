<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import type { Planet } from "../planet/planet.type"
import GenericTable, {
	ColumnDefinition,
	TableProps,
} from "../components/GenericTable.vue"
import type { TableSlotData } from "../components/GenericTable.vue"
import type { Person } from "../person/person.type"
import PlanetDialog from "../planet/PlanetDialog.vue"
import { sortByNumber, sortByString, sortWithSelector } from "../utils/sort"
import { dateFormatter, numberFormatter } from "../utils/formatting"

const colDefs: ColumnDefinition<Person>[] = [
	{
		label: "Name",
		// getValue: ({ name }) => name,
		slot: "name",
		sortingFn: sortWithSelector<Person>(({ name }) => name)(sortByString),
		width: "180px",
	},
	{
		label: "Height (cm)",
		getValue: ({ height }) =>
			height ? String(numberFormatter.format(height)) : "unknown",
		sortingFn: sortWithSelector<Person>(({ height }) => height ?? -Infinity)(
			sortByNumber,
		),
		width: "120px",
	},
	{
		// TODO prevent null from being displayed
		label: "Mass (kg)",
		getValue: ({ mass }) =>
			mass ? String(numberFormatter.format(mass)) : "unknown",
		sortingFn: sortWithSelector<Person>(({ mass }) => mass ?? -Infinity)(
			sortByNumber,
		),
		width: "100px",
	},
	{
		label: "Created",
		getValue: ({ created }) => dateFormatter.format(new Date(created)),
		sortingFn: sortWithSelector<Person>(person => {
			if (!person.created.getTime) {
			}
			return person.created?.getTime()
		})(sortByNumber),
		width: "160px",
	},
	// TODO check if this really works
	{
		label: "Edited",
		getValue: ({ edited }) => dateFormatter.format(new Date(edited)),
		sortingFn: sortWithSelector<Person>(({ edited }) => edited?.getTime())(
			sortByNumber,
		),
		width: "160px",
	},
	{
		slot: "homeworld",
		label: "Planet",
		width: "140px",
		sortingFn: (a, b) => {
			const planetAName =
				props.planets.find(planet => planet.id === a.homeworld)?.name ?? ""
			const planetBName =
				props.planets.find(planet => planet.id === b.homeworld)?.name ?? ""

			return sortByString(planetAName, planetBName)
		},
	},
]

const props = defineProps<{
	people: Person[]
	planets: Planet[]
}>()

const planetModalIsOpen = ref(false)
const clickedPlanetId = ref()
const modalPlanet = computed(() =>
	// TODO fetch effect
	props.planets?.find(({ id }) => id === clickedPlanetId.value),
)
function handlePlanetClick(planetId: Person["homeworld"]) {
	clickedPlanetId.value = planetId
	planetModalIsOpen.value = true
}
</script>

<template>
	<GenericTable
		class="personTable"
		:values="(props.people as any)"
		:columns="(colDefs as any)"
		idKey="id"
	>
		<template #name="{ item }: TableSlotData<Person>">
			<span class="font-semibold">{{ item.name }}</span>
		</template>

		<template #homeworld="{ item }: TableSlotData<Person>">
			<span v-if="item.homeworld !== null">
				<button
					type="button"
					@click="handlePlanetClick(item.homeworld)"
					class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
				>
					{{ planets?.find(planet => planet.id === item.homeworld)?.name }}
				</button>
			</span>

			<template v-else>unknown</template>
		</template>
	</GenericTable>

	<PlanetDialog
		:open="planetModalIsOpen"
		:planet="modalPlanet"
		@close="
			() => {
				planetModalIsOpen = false
			}
		"
	/>
</template>
