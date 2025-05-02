import { planets, moons } from './constants';
import { Planet } from './Planet';
import styles from './PlanetSystem.module.css';
import { groupBy } from '../../helpers/groupBy';

export const PlanetSystem: React.FC = () => {
  const groupedMoons = groupBy(moons, 'planetId');

  const planetWithMoons = planets.map((planet) => ({
    ...planet,
    moons: groupedMoons[planet.id] || [],
  }));

  return (
    <div className={styles.planetSystem}>
      {planetWithMoons.map(({ id, title, moons }) => (
        <Planet key={id} planet={{ id, title }} moons={moons} />
      ))}
    </div>
  );
};
