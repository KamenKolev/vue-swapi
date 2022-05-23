import { cacheJsonRequest } from "../utils/cache"
import { Planet } from "./planet.type"

type PlanetDTO = Planet

const fetchAllPlanets = (): Promise<PlanetDTO[]> =>
  fetch(`${import.meta.env.VITE_API_URL}planets`).then(res => res.json())

export const getAllPlanets = cacheJsonRequest()("planets")(fetchAllPlanets)
