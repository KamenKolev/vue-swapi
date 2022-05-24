import { expect, test, vi } from "vitest"
import { assert, nullable, number, object, string } from "superstruct"

// polyfills
import { MockStorage } from "../utils/cache.test"
import "cross-fetch/polyfill"
vi.stubGlobal("localStorage", new MockStorage())
import { getAllPlanets } from "./planet.service"

const planetSchema = object({
  id: number(),
  name: string(),
  diameter: nullable(number()),
  climate: nullable(string()),
  population: nullable(number()),
})

// NOTE: API is not currently mocked. neither is fetch
test("PlanetsService returns a non-empty list of the correct type", async () => {
  const planets = await getAllPlanets()

  expect(planets).toBeInstanceOf(Array)
  expect(planets.length).toBeGreaterThan(0)
  planets.forEach(planet => assert(planet, planetSchema))
})
