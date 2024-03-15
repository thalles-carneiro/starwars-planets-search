import { useState } from 'react';
import {
  ChangeEventType,
  ColumnType,
  FilterType,
  PlanetType,
  SortingConfigType,
} from '../types';

export default function useFilterPlanets(planets: PlanetType[]) {
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [searchName, setSearchName] = useState('');
  const [sorting, setSorting] = useState<SortingConfigType | null>(null);

  const handleFilters = (filter: FilterType | ColumnType | 'removeAll') => {
    if (typeof filter === 'string') {
      const updateFilters = filter === 'removeAll'
        ? []
        : filters.filter(({ column }) => column !== filter);
      setFilters(updateFilters);
    } else {
      const updateFilters = [...filters, filter];
      setFilters(updateFilters);
    }
  };

  const handleSearchName = ({ target }: ChangeEventType) => {
    setSearchName(target.value);
  };

  const handleSorting = (sortingConfig: SortingConfigType) => {
    setSorting(sortingConfig);
  };

  const filteredPlanetsByName = [...planets]
    .filter((planet) => planet.name.includes(searchName));
  const filteredPlanetsByFilters = filteredPlanetsByName
    .filter((planet) => filters.every(({ column, comparison, value }) => {
      switch (comparison) {
        case 'maior que':
          return +planet[column] > +value;
        case 'menor que':
          return +planet[column] < +value;
        case 'igual a':
          return +planet[column] === +value;
        default:
          return false;
      }
    }));
  console.log({ sorting });
  const sortedPlanets = !sorting
    ? filteredPlanetsByFilters
    : filteredPlanetsByFilters.sort((a, b) => {
      if (
        a[sorting.column] === 'unknown'
        || b[sorting.column] === 'unknown') {
        return a[sorting.column].localeCompare(b[sorting.column]);
      }
      switch (sorting.sort) {
        case 'ASC':
          return (+a[sorting.column]) - (+b[sorting.column]);
        case 'DESC':
          return (+b[sorting.column]) - (+a[sorting.column]);
        default:
          return 0;
      }
    });

  return {
    filteredPlanets: sortedPlanets,
    filters,
    handleFilters,
    searchName,
    handleSearchName,
    handleSorting,
  };
}
