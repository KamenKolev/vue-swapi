<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getAllPlanets } from "./planet/planet.service"
import type { Planet } from "./planet/planet.type"
import { getAllPeople } from "./person/person.service"
import type { Person } from "./person/person.type"
import PersonTable from "./person/PersonTable.vue"
import { FilterIcon } from "@heroicons/vue/solid"
import Header from "./components/Header.vue"

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
  <Header class="h-20" />
  <main
    class="relative flex h-screen w-screen flex-col items-center justify-items-center gap-4 overflow-hidden bg-white py-4 pb-16 text-black dark:bg-black dark:text-white md:px-4"
  >
    <label
      class="flex w-64 items-center border border-inherit bg-inherit p-0 text-inherit"
    >
      <FilterIcon class="mx-2 h-5 w-5" />

      <input
        class="w-full border-none bg-inherit p-2"
        type="text"
        v-model="searchString"
        placeholder="Fitler by name"
      />
    </label>

    <PersonTable :planets="planets ?? []" :people="filteredPeople ?? []" />
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - 80px);
}
</style>
