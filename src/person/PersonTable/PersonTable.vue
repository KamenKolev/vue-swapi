<script setup lang="ts">
import { ref } from "vue"
import type { Planet } from "../../planet/planet.type"
import GenericTable from "../../components/GenericTable.vue"
import type { TableSlotData } from "../../components/GenericTable.vue"
import type { Person } from "../../person/person.type"
import { personTableColumns } from "./columns"
import ButtonVue from "../../components/Button.vue"
import PlanetDialog from "../../planet/PlanetDialog.vue"

const props = defineProps<{
  people: Person[]
  planets: Planet[]
}>()

const selectedPlanetID = ref<Person["homeworld"]>()
</script>

<template>
  <GenericTable
    class="personTable"
    :values="(props.people as any)"
    :columns="(personTableColumns as any)"
  >
    <template #name="{ item }: TableSlotData<Person>">
      <span class="font-semibold">{{ item.name }}</span>
    </template>

    <template #homeworld="{ item }: TableSlotData<Person>">
      <ButtonVue
        v-if="item.homeworld"
        :id="item.homeworld"
        @click.native="selectedPlanetID = item.homeworld"
      >
        {{ planets.find(planet => planet.id === item.homeworld)?.name }}
      </ButtonVue>
    </template>
  </GenericTable>

  <PlanetDialog
    :open="typeof selectedPlanetID === 'number'"
    :id="selectedPlanetID || undefined"
    @close="selectedPlanetID = null"
  />
</template>
