type PersonDTO = {
  id: number;
  name: string;
  height: number;
  /**
   * ISOString
   */
  created: string;
  /**
   * ISOString
   */
  edited: string;
  homeworld: number;
  mass: number | null;
};

export type Person = Omit<PersonDTO, "created" | "edited"> & {
  created: Date;
  edited: Date;
};

/**
 * Mutates the DTO!
 */
const personFromDTO = (dto: PersonDTO): Person =>
  Object.assign(dto, {
    created: new Date(dto.created),
    edited: new Date(dto.edited),
  });

// TODO utilize env
export const getAllPeople = (): Promise<PersonDTO[]> =>
  fetch("http://localhost:8080/people")
    .then((res) => res.json())
    .then((dtos) => dtos.map(personFromDTO));
