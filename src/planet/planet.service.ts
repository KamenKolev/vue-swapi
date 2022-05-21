import { cacheJsonRequest } from "../utils/cache"
import { Planet } from "./planet.type"

type PlanetDTO = Planet

// TODO utilize env
const fetchAllPlanets = (): Promise<PlanetDTO[]> =>
	fetch("https://go-swapi.fly.dev/planets").then(res => res.json())

export const getAllPlanets = cacheJsonRequest()("planets")(fetchAllPlanets)
