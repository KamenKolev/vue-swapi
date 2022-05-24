<script setup lang="ts">
import { onClickOutside, onKeyDown } from "@vueuse/core"
import { ref, effect } from "vue"
import { XIcon } from "@heroicons/vue/solid"

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (event: "close"): void
}>()

const dialogElement = ref<HTMLDialogElement | null>(null)
const dialogInnerElement = ref(null)
onClickOutside(dialogInnerElement, () => emit("close"))
onKeyDown(
  ({ key }) => key === "Escape",
  () => emit("close"),
)

/* Backdrop is only displayed when dialog is opened with dialog.showModal() */
effect(() => {
  if (dialogElement?.value) {
    if (props.open) {
      // @ts-ignore
      dialogElement.value?.showModal()
    } else {
      // @ts-ignore
      dialogElement.value?.close()
    }
  }
})
</script>

<template>
  <dialog ref="dialogElement" class="w-full max-w-max p-0">
    <div
      class="pointer-events-auto border-none bg-white p-8 pt-4 text-black text-current shadow-lg outline-none dark:bg-gray-900 dark:text-white"
      ref="dialogInnerElement"
    >
      <button
        type="button"
        @click="() => emit('close')"
        class="absolute right-4 top-4 hover:text-banana"
      >
        <XIcon class="h-6 w-6" />
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
