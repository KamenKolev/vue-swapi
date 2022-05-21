import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// treat all tags with a dash as custom elements
					// @ts-ignore
					isCustomElement: tag => tag.includes("-"),
				},
			},
		}),
	],
})
