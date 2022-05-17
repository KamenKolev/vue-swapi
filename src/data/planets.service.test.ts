import { assert, number, object, string } from "superstruct"
import { describe, expect, test } from "vitest"
import "cross-fetch/polyfill"
import { getAllPlanets } from "./planets.service"

const planetSchema = object({
	id: number(),
	name: string(),
	diameter: number(),
	climate: string(),
	population: number(),
})

describe("adasd", () => {
	// NOTE: API is not currently mocked. neither is fetch
	test("Service returns a non-empty list of the correct type", async () => {
		const planets = await getAllPlanets()

		expect(planets).toBeInstanceOf(Array)
		expect(planets.length).toBeGreaterThan(0)
		planets.forEach(planet => assert(planet, planetSchema))
	})
})
