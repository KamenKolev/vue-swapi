<script setup lang="ts">
import { theme } from "../state/theme"
</script>
<template>
  <span>
    <button v-if="theme === 'light'" type="button" @click="theme = 'dark'">
      <img
        src="../assets/leia_icon.svg"
        alt="using dark theme"
        class="h-12 w-12 p-3"
      />
    </button>

    <button v-else type="button" @click="theme = 'light'">
      <img
        src="../assets/vader_icon.svg"
        alt="using light theme"
        class="h-12 w-12 p-3 invert"
      />
    </button>
  </span>
</template>
