import { useEffect, useState } from 'react';
import { getPlanets } from '../services/api';
import { PlanetType } from '../types';

export default function useFetchPlanets() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        setError('');
        const planetsData = await getPlanets();
        setPlanets(planetsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  return { planets, loading, error };
}
