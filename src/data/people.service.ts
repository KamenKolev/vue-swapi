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
  planetId: string;
  mass: number | null;
};

export type Person = Omit<PersonDTO, "created" | "edited"> & {
  created: Date;
  edited: Date;
};

// TODO utilize env
export const getAllPeople = (): Promise<PersonDTO[]> =>
  fetch("localhost:8080/people").then((res) => res.json());
