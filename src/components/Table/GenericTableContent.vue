<script lang="ts" setup>
import type { ColumnDefinition } from "./types"

defineProps<{
  columns: ColumnDefinition[]
  values: any[]
}>()
</script>

<template>
  <tr v-for="value in values" :key="value.id">
    <td
      v-for="col in columns"
      :style="col.styles"
      :key="typeof col.getValue?.(value) === 'string'
							? col.getValue(value) as string
							: undefined
					"
      class="p-4"
    >
      {{ col.getValue?.(value) }}
      <slot v-if="col && col.slot" :name="col.slot" :item="value"> </slot>
    </td>
  </tr>
</template>
