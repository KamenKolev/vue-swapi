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
    <table>
      <tr>
        <th class="py-1 pr-6 text-left font-semibold">Climate</th>
        <td>{{ planet?.climate ?? "-" }}</td>
      </tr>
      <tr>
        <th class="py-1 pr-6 text-left font-semibold">Diameter (km)</th>
        <td>
          {{
            planet?.diameter
              ? `${numberFormatter.format(planet.diameter)}`
              : "-"
          }}
        </td>
      </tr>
      <tr>
        <th class="py-1 pr-6 text-left font-semibold">Population</th>
        <td>
          {{
            planet?.population
              ? `${numberFormatter.format(planet.population)}`
              : "-"
          }}
        </td>
      </tr>
    </table>
  </Dialog>
</template>
