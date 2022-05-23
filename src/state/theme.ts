import { ref } from "vue"

type Theme = "light" | "dark"

const defaultTheme: Theme = "light"
const initalTheme: Theme =
  (localStorage.getItem("theme") as Theme) ?? defaultTheme

export const theme = ref<Theme>(initalTheme)
