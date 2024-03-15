import { useContext } from 'react';
import PlanetsContext, { PlanetsContextType } from '../context/PlanetsContext';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

function Table() {
  const planetsContext = useContext(PlanetsContext) as PlanetsContextType;
  if (planetsContext === null) {
    throw new Error('Planets Context precisa de um PROVIDER, verifique');
  }
  const {
    filteredPlanets,
    loading,
    error,
  } = planetsContext;

  if (error) return <ErrorMessage message={ error } />;
  if (loading) return <Loading />;

  return (
    <table>
      <thead>
        <tr>
          {
            Object.keys(filteredPlanets[0]).map((value) => (
              <th key={ value }>{ value }</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet).map((value, index) => (
                    index === 0
                      ? (
                        <td
                          key={ `${planet.name}_${value}` }
                          data-testid="planet-name"
                        >
                          { value }
                        </td>
                      )
                      : <td key={ `${planet.name}_${value}` }>{ value }</td>
                  ))
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

export default Table;
