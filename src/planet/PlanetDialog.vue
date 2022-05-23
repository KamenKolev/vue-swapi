<script setup lang="ts">
import { Planet } from "./planet.type"
import { numberFormatter } from "../utils/formatting"
import Dialog from "../components/Dialog.vue"
import { planets } from "../state/planets"
import { computed } from "vue"

const props = defineProps<{
  id?: Planet["id"]
  open: boolean
}>()
const emit = defineEmits<{
  (event: "close"): void
}>()

const planet = computed(() => planets.value?.find(({ id }) => id === props.id))
</script>

<template>
  <Dialog :open="open" @close="() => emit('close')">
    <div class="mb-4 text-xl font-semibold">{{ planet?.name }}</div>
    <ul>
      <li class="my-1">Climate: {{ planet?.climate }}</li>
      <li class="my-1" v-if="planet?.diameter">
        Diameter: {{ numberFormatter.format(planet.diameter) }} km
      </li>
      <li class="my-1" v-if="planet?.population">
        Population: {{ numberFormatter.format(planet.population) }}
      </li>
    </ul>
  </Dialog>
</template>
