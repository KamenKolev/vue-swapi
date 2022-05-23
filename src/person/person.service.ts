import { cacheJsonRequest } from "../utils/cache"
import { Person } from "./person.type"

export type PersonDTO = {
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

/**
 * Mutates the DTO!
 */
const personFromDTO = (dto: PersonDTO): Person =>
	Object.assign(dto, {
		created: new Date(dto.created),
		edited: new Date(dto.edited),
	})

const fetchAllPeople = (): Promise<Person[]> =>
	fetch(`${import.meta.env.VITE_API_URL}people`)
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
