import { createContext } from 'react';
import {
  ChangeEventType,
  ColumnType,
  FilterType,
  PlanetType,
  SortingConfigType } from '../types';

export type PlanetsContextType = {
  planets: PlanetType[],
  loading: boolean,
  error: string,
  filteredPlanets: PlanetType[],
  filters: FilterType[],
  handleFilters: (filter: FilterType | ColumnType | 'removeAll') => void,
  searchName: string,
  handleSearchName: (e: ChangeEventType) => void,
  handleSorting: (sortingConfig: SortingConfigType) => void,
};

const PlanetsContext = createContext<PlanetsContextType | null>(null);

export default PlanetsContext;
