import { cacheJsonRequest } from "../utils/cache"
import { Planet } from "./planet.type"

type PlanetDTO = Planet

// TODO utilize env
const fetchAllPlanets = (): Promise<PlanetDTO[]> =>
	fetch("http://localhost:8080/planets").then(res => res.json())

export const getAllPlanets = cacheJsonRequest()("planets")(fetchAllPlanets)
