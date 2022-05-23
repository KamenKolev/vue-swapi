<script setup lang="ts">
import { effect, ref } from "vue"
import type { Planet } from "../../planet/planet.type"
import GenericTable from "../../components/Table/GenericTable.vue"
import type { TableSlotData } from "../../components/Table/types"
import type { Person } from "../../person/person.type"
import { usePersonColumns } from "./usePersonColumns"
import ButtonVue from "../../components/Button.vue"
import PlanetDialog from "../../planet/PlanetDialog.vue"

const props = defineProps<{
  people: Person[] | undefined
  planets: Planet[] | undefined
}>()

const columns = usePersonColumns()
const selectedPlanetID = ref<Person["homeworld"]>()
</script>

<template>
  <GenericTable class="personTable" :values="props.people" :columns="columns">
    <template #name="{ item }: TableSlotData<Person>">
      <span class="font-semibold">{{ item.name }}</span>
    </template>

    <template #homeworld="{ item }: TableSlotData<Person>">
      <ButtonVue
        v-if="item.homeworld"
        :id="item.homeworld"
        @click.native="selectedPlanetID = item.homeworld"
      >
        {{ planets?.find(planet => planet.id === item.homeworld)?.name }}
      </ButtonVue>

      <template v-else>-</template>
    </template>
  </GenericTable>

  <PlanetDialog
    :open="typeof selectedPlanetID === 'number'"
    :id="selectedPlanetID || undefined"
    @close="selectedPlanetID = null"
  />
</template>
