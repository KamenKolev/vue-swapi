import { cacheJsonRequest } from "./utils"

type PersonDTO = {
	id: number
	name: string
	height: number
	/**
	 * ISOString
	 */
	created: string
	/**
	 * ISOString
	 */
	edited: string
	homeworld: number
	mass: number | null
}

export type Person = Omit<PersonDTO, "created" | "edited"> & {
	created: Date
	edited: Date
}

/**
 * Mutates the DTO!
 */
const personFromDTO = (dto: PersonDTO): Person =>
	Object.assign(dto, {
		created: new Date(dto.created),
		edited: new Date(dto.edited),
	})

// TODO utilize env
const fetchAllPeople = (): Promise<Person[]> =>
	fetch("http://localhost:8080/people")
		.then(res => res.json())
		.then((dtos: PersonDTO[]) => dtos.map(dto => personFromDTO(dto)))

export const getAllPeople = cacheJsonRequest()("people")(
	fetchAllPeople,
	(k, v) => {
		if (k === "created" || k === "edited") {
			return new Date(v as any)
		}
		return v
	},
)
