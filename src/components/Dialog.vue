<script setup lang="ts">
import { onClickOutside, onKeyDown } from "@vueuse/core"
import { ref } from "vue"
import { XIcon } from "@heroicons/vue/solid"

defineProps<{
	open: boolean
}>()
const emit = defineEmits<{
	(event: "close"): void
}>()

const dialogElement = ref(null)
onClickOutside(dialogElement, () => emit("close"))
onKeyDown(
	({ key }) => key === "Escape",
	() => emit("close"),
)
</script>

<template>
	<dialog
		:open="open"
		ref="dialogElement"
		class="pointer-events-auto top-1/3 w-full max-w-max rounded-md border-none bg-white bg-clip-padding p-4 text-current shadow-lg outline-none dark:border dark:border-white dark:bg-black"
	>
		<button
			type="button"
			@click="() => emit('close')"
			class="absolute right-4 top-4"
		>
			<XIcon class="h-6 w-6" />
		</button>
		<div class="rounded-2xl bg-white dark:bg-black">
			<slot />
		</div>
	</dialog>
</template>
