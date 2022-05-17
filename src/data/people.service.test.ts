import { assert, date, nullable, number, object, string } from "superstruct";
import { expect, test } from "vitest";
import "cross-fetch/polyfill";
import { getAllPeople } from "./people.service";

const personSchema = object({
  id: number(),
  mass: nullable(number()),
  name: string(),
  height: number(),
  created: date(),
  edited: date(),
  homeworld: number(),
});

// NOTE: API is not currently mocked. neither is fetch
test("Service returns a non-empty list of the correct type", async () => {
  const people = await getAllPeople();

  expect(people).toBeInstanceOf(Array);
  expect(people.length).toBeGreaterThan(0);
  people.forEach((person) => assert(person, personSchema));
});
