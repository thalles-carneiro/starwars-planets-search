import React from 'react';
import PlanetsContext from './PlanetsContext';
import useFetchPlanets from '../hooks/useFetchPlanets';
import useFilterPlanets from '../hooks/useFilterPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const { planets, loading, error } = useFetchPlanets();
  const {
    filteredPlanets,
    filters,
    handleFilters,
    searchName,
    handleSearchName,
    handleSorting,
  } = useFilterPlanets(planets);

  const contextValue = {
    planets,
    loading,
    error,
    filteredPlanets,
    filters,
    handleFilters,
    searchName,
    handleSearchName,
    handleSorting,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
