<script setup lang="ts">
import { FilterIcon } from "@heroicons/vue/solid"

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (event: "update:modelValue", searchString: string): void
}>()
</script>

<template>
  <label
    class="flex w-64 items-center border border-inherit bg-inherit p-0 text-inherit"
  >
    <FilterIcon class="mx-2 h-5 w-5" />

    <input
      class="w-full border-none bg-inherit p-2"
      type="text"
      :value="modelValue"
      @input="(e) => emit('update:modelValue',(e.target as any).value)"
      :placeholder="placeholder"
    />
  </label>
</template>
