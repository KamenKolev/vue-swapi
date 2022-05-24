import { assert, date, nullable, number, object, string } from "superstruct"
import { expect, test, vi } from "vitest"

// polyfills
import { MockStorage } from "../utils/cache.test"
import "cross-fetch/polyfill"
vi.stubGlobal("localStorage", new MockStorage())
import { getAllPeople } from "./person.service"

const personSchema = object({
  id: number(),
  mass: nullable(number()),
  name: string(),
  height: nullable(number()),
  created: date(),
  edited: date(),
  homeworld: nullable(number()),
})

// NOTE: API is not currently mocked. neither is fetch
test("People Service returns a non-empty list of the correct type", async () => {
  const people = await getAllPeople()

  expect(people).toBeInstanceOf(Array)
  expect(people.length).toBeGreaterThan(0)
  people.forEach(person => assert(person, personSchema))
})
