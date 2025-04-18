import { planets, moons } from './../../constants';
import { Planet } from './Planet';
import styles from './PlanetSystem.module.css';

export const PlanetSystem: React.FC = () => {
  return (
    <div className={styles.planetSystem}>
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          moons={moons.filter((moon) => moon.planetId === planet.id)}
        />
      ))}
    </div>
  );
};
