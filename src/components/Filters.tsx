import { useContext, useState } from 'react';
import PlanetsContext, { PlanetsContextType } from '../context/PlanetsContext';
import { ChangeEventType, ColumnType, FilterType, SortingConfigType } from '../types';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
] as ColumnType[];

function Filters() {
  const {
    filters,
    handleFilters,
    searchName,
    handleSearchName,
    handleSorting,
  } = useContext(PlanetsContext) as PlanetsContextType;

  const [filterForm, setFilterForm] = useState<FilterType>({
    column: columns[0],
    comparison: 'maior que',
    value: '0',
  });
  const [order, setOrder] = useState<SortingConfigType>({
    sort: 'ASC',
    column: columns[0],
  });

  const handleChange = (event: ChangeEventType) => {
    const { name, value } = event.target as HTMLInputElement;
    setFilterForm({ ...filterForm, [name]: value });
  };

  return (
    <section>
      <h1>Star Wars Search</h1>
      <section>
        <input
          type="text"
          value={ searchName }
          onChange={ handleSearchName }
          data-testid="name-filter"
        />
      </section>
      <section>
        <div>
          <label htmlFor="column-filter">Coluna</label>
          <select
            id="column-filter"
            name="column"
            value={ filterForm.column }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            { columns
              .filter((value) => !filters
                .map(({ column }) => column).includes(value))
              .map((value) => (
                <option key={ value }>{ value }</option>
              )) }
          </select>
        </div>
        <div>
          <label htmlFor="comparison-filter">Operador</label>
          <select
            id="comparison-filter"
            name="comparison"
            value={ filterForm.comparison }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </div>
        <div>
          <label htmlFor="value-filter">Valor</label>
          <input
            id="value-filter"
            name="value"
            value={ filterForm.value }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </div>
        <button
          type="button"
          onClick={ () => {
            handleFilters(filterForm);
            setFilterForm({
              column: columns
                .filter((value) => !filters
                  .map(({ column }) => column).includes(value))[0],
              comparison: 'maior que',
              value: '0',
            });
          } }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
      <section>
        <div>
          <label htmlFor="column-sort">Ordenar</label>
          <select
            id="column-sort"
            name="column"
            value={ order.column }
            onChange={
              (e) => setOrder({ ...order, column: e.target.value as ColumnType })
            }
            data-testid="column-sort"
          >
            { columns
              .map((value) => (
                <option key={ value }>{ value }</option>
              )) }
          </select>
          <div>
            <label htmlFor="asc-sort">Ascendente</label>
            <input
              id="asc-sort"
              name="sort"
              type="radio"
              value="ASC"
              checked={ order.sort === 'ASC' }
              onChange={
                () => setOrder({ ...order, sort: 'ASC' })
              }
              data-testid="column-sort-input-asc"
            />
            <label htmlFor="desc-sort">Descendente</label>
            <input
              id="desc-sort"
              name="sort"
              type="radio"
              value="DESC"
              checked={ order.sort === 'DESC' }
              onChange={
                () => setOrder({ ...order, sort: 'DESC' })
              }
              data-testid="column-sort-input-desc"
            />
          </div>
          <button
            type="button"
            onClick={ () => {
              console.log({ order });
              handleSorting(order);
            } }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </div>
      </section>
      <section>
        { filters.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <span>{ filter.column }</span>
            <span>{ filter.comparison }</span>
            <span>{ filter.value }</span>
            <button onClick={ () => handleFilters(filter.column) }>X</button>
          </div>
        )) }
        <button
          type="button"
          onClick={ () => handleFilters('removeAll') }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>
      </section>
    </section>
  );
}

export default Filters;
