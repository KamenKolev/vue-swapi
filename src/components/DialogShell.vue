<script setup lang="ts">
import { DialogPanel } from "@headlessui/vue"

const emit = defineEmits<{
	(event: "close"): void
}>()
</script>

<template>
	<DialogPanel>
		<button @click="emit('close')">❌</button>
		<slot></slot>
	</DialogPanel>
</template>
