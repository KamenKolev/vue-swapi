<script setup lang="ts">
import { computed, ref } from "vue"
import PersonTable from "./person/PersonTable/PersonTable.vue"
import Header from "./components/Header.vue"
import SearchBox from "./components/SearchBox.vue"
import { people } from "./state/people"
import { planets } from "./state/planets"
import ThemeToggle from "./components/ThemeToggle.vue"
import { theme } from "./state/theme"

const searchString = ref("")
const filteredPeople = computed(() =>
  people.value?.filter(person =>
    person.name.toLowerCase().includes(searchString.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <div
    :class="{
      dark: theme === 'dark',
    }"
  >
    <Header class="h-20" />
    <main
      class="relative flex h-screen w-screen flex-col items-center justify-items-center gap-4 overflow-hidden bg-white py-4 pb-16 text-black dark:bg-black dark:text-white md:px-4"
    >
      <span class="flex">
        <SearchBox
          class="h-12"
          v-model="searchString"
          placeholder="Fitler by name"
        />
        <ThemeToggle />
      </span>

      <PersonTable :planets="planets ?? []" :people="filteredPeople ?? []" />
    </main>
  </div>
</template>

<style scoped>
main {
  height: calc(100vh - 80px);
}
</style>
