<script setup lang="ts">
import { onClickOutside } from "@vueuse/core"
import { ref } from "vue"

defineProps<{
	open: boolean
}>()
const emit = defineEmits<{
	(event: "close"): void
}>()

const contentEl = ref(null)
onClickOutside(contentEl, e => emit("close"))
</script>

<template>
	<dialog
		:open="open"
		class="border-none shadow-lg w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
	>
		<div ref="contentEl" class="content">
			<slot />
		</div>
	</dialog>
</template>

<style scoped>
dialog {
	top: 30%;
	width: max-content;
}

.content {
	background: white;
	padding: 2rem;
	border-radius: 1rem;
}
</style>
