import { PlanetType } from '../types';

export const getPlanets = async () => {
  const PLANETS_ENDPOINT = 'https://swapi.dev/api/planets';
  const response = await fetch(PLANETS_ENDPOINT);
  const data = await response.json();
  data.results.forEach((planet: PlanetType) => {
    delete planet.residents;
  });
  return data.results as PlanetType[];
};
