type PlanetDTO = {
  id: number;
  name: string;
  diameter: number;
  climate: string;
  population: number;
};

export type Planet = PlanetDTO;

// TODO utilize env
export const getAllPlanets = (): Promise<PlanetDTO[]> =>
  fetch("localhost:8080/planets").then((res) => res.json());
