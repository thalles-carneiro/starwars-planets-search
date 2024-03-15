export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents?: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type ColumnType = 'population' | 'rotation_period' | 'orbital_period'
| 'diameter' | 'surface_water';

export type ComparisonType = 'maior que' | 'menor que' | 'igual a';

export type FilterType = {
  column: ColumnType,
  comparison: ComparisonType,
  value: string,
};

export type SortType = '' | 'ASC' | 'DESC';

export type SortingConfigType = {
  column: ColumnType,
  sort: SortType,
};

export type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type SubmitEventType = React.FormEvent<HTMLFormElement>;
