<script setup lang="ts">
import { computed, ref } from "vue"
import type { Planet } from "../planet/planet.type"
import GenericTable, { ColumnDefinition } from "../components/GenericTable.vue"
import type { TableSlotData } from "../components/GenericTable.vue"
import type { Person } from "../person/person.type"
import PlanetDialog from "../planet/PlanetDialog.vue"
import { sortByNumber, sortByString, sortWithSelector } from "../utils/sort"
import { dateFormatter, numberFormatter } from "../utils/formatting"

const colDefs: ColumnDefinition<Person>[] = [
  {
    label: "Name",
    slot: "name",
    sortingFn: sortWithSelector<Person>(({ name }) => name)(sortByString),
    styles: {
      minWidth: "185px",
      maxWidth: "185px",
    },
  },
  {
    label: "Height (cm)",
    getValue: ({ height }) =>
      height ? String(numberFormatter.format(height)) : "",
    sortingFn: sortWithSelector<Person>(({ height }) => height ?? -Infinity)(
      sortByNumber,
    ),
    styles: {
      minWidth: "140px",
      maxWidth: "140px",
      textAlign: "center",
    },
  },
  {
    label: "Mass (kg)",
    getValue: ({ mass }) => (mass ? String(numberFormatter.format(mass)) : ""),
    sortingFn: sortWithSelector<Person>(({ mass }) => mass ?? -Infinity)(
      sortByNumber,
    ),
    styles: {
      minWidth: "120px",
      maxWidth: "120px",
      textAlign: "center",
    },
  },
  {
    label: "Created",
    getValue: ({ created }) => dateFormatter.format(new Date(created)),
    sortingFn: sortWithSelector<Person>(person => {
      if (!person.created.getTime) {
      }
      return person.created?.getTime()
    })(sortByNumber),
    styles: {
      minWidth: "160px",
      maxWidth: "160px",
      textAlign: "center",
    },
  },
  {
    label: "Edited",
    getValue: ({ edited }) => dateFormatter.format(new Date(edited)),
    sortingFn: sortWithSelector<Person>(({ edited }) => edited?.getTime())(
      sortByNumber,
    ),
    styles: {
      minWidth: "160px",
      maxWidth: "160px",
      textAlign: "center",
    },
  },
  {
    slot: "homeworld",
    label: "Planet",
    styles: {
      minWidth: "175px",
      maxWidth: "175px",
      textAlign: "center",
    },
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
      <button
        v-if="item.homeworld !== null"
        type="button"
        @click="handlePlanetClick(item.homeworld)"
        class="w-full bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-gray-900 hover:dark:bg-banana dark:hover:text-black"
      >
        {{ planets?.find(planet => planet.id === item.homeworld)?.name }}
      </button>
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
