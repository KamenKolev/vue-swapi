import { cacheJsonRequest } from "./utils"

type PlanetDTO = {
	id: number
	name: string
	diameter: number
	climate: string
	population: number
}

export type Planet = PlanetDTO

// TODO utilize env
const fetchAllPlanets = (): Promise<Planet[]> =>
	fetch("http://localhost:8080/planets").then(res => res.json())

export const getAllPlanets = cacheJsonRequest()("planets")(fetchAllPlanets)
