<script lang="ts" setup></script>
<template>
  <div class="flex justify-center p-4">
    <a href="https://github.com/KamenKolev/vue-swapi">
      <img class="h-8 w-8 invert" src="../assets/github_icon.svg" />
    </a>
  </div>
</template>

<style scoped>
a {
  filter: brightness(50%) grayscale(100%);
  transition: filter 0.2s ease-in-out;
}
a:hover,
:focus-within {
  filter: brightness(100%) grayscale(100%);
}
</style>
