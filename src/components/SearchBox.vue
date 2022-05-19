<script lang="ts" setup>
const emit = defineEmits<{
	(event: "filter", value: string): void
}>()
</script>

<template>
	<!-- <input type="text" @change="e => emit("filter", e.target.value)" /> -->
</template>
