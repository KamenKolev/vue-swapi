<script setup lang="ts">
// import { Dialog, DialogTitle, DialogDescription } from "@headlessui/vue"
import { Planet } from "../data/planets.service"
import DialogShell from "./DialogShell.vue"
import { onClickOutside } from "@vueuse/core"

defineProps<{
	planet?: Planet
	open: boolean
}>()
const emit = defineEmits<{
	(event: "close"): void
}>()
</script>

<template>
	<!-- TODO replace with headless dialog -->
	<dialog :open="open">
		<div class="content">
			<div>Planet {{ planet?.name }}</div>

			<ul>
				<li>Climate: {{ planet?.climate }}</li>
				<li>Diameter: {{ planet?.diameter }}</li>
				<li>Population: {{ planet?.population }}</li>
			</ul>
		</div>
	</dialog>
</template>

<style scoped>
dialog {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
