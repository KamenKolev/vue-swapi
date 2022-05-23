<template>
	<header
		class="p-4 text-center text-5xl font-semibold dark:bg-black dark:text-white"
	>
		<h1>Star Wars</h1>
	</header>
</template>

<style scoped>
h1 {
	white-space: nowrap;
	font-family: "Starjedi";
}

@media (prefers-color-scheme: dark) {
	h1 {
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke: 1px #ffe81f;
		-webkit-text-fill-color: black;
	}
}

@media (prefers-color-scheme: light) {
	h1 {
		-webkit-text-stroke: 1px black;
		-webkit-text-stroke-width: 1px;
		-webkit-text-fill-color: #ffe81f;
	}
}
</style>
