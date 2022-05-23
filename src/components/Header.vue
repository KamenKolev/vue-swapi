<template>
  <header
    class="p-4 text-center text-5xl font-semibold dark:bg-black dark:text-white"
  >
    <h1 class="pointer-events-none">Star Wars</h1>
  </header>
</template>

<style scoped>
h1 {
  white-space: nowrap;
  font-family: "Starjedi";
}

@media (prefers-color-scheme: dark) {
  h1 {
    -webkit-text-stroke: 1px #ffe81f;
    -webkit-text-fill-color: black;
  }
}

@media (prefers-color-scheme: light) {
  h1 {
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: #ffe81f;
  }
}
</style>
