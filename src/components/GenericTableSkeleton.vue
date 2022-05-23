<script lang="ts" setup>
import { ColumnDefinition } from "./GenericTable.vue"
import Skeleton from "./Skeleton.vue"

defineProps<{
  columns: ColumnDefinition[]
}>()

const SKELETON_ROW_NUMBER = 10
</script>
<template>
  <tr v-for="_ in SKELETON_ROW_NUMBER">
    <td
      v-for="col in columns"
      :style="{ ...(col.styles ?? {}), height: '72.8px' }"
      class="p-4"
    >
      <Skeleton />
    </td>
  </tr>
</template>
