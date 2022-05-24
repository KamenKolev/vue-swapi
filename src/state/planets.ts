import { Planet } from "../planet/planet.type"
import { getAllPlanets } from "../planet/planet.service"
import { ref } from "vue"

export const planets = ref<undefined | Planet[]>(undefined)

getAllPlanets()
  .then(res => (planets.value = res))
  .catch(() => (planets.value = []))
