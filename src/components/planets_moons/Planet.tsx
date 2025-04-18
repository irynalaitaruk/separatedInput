import { useState } from "react";
import { Moon } from "./Moon";
import { Moons, Planets } from './../../constants';
import styles from './Planet.module.css';

const colors = ["green", "blue", "purple"];

interface PlanetProps {
  planet: Planets;
  moons: Moons[];
}

export const Planet: React.FC<PlanetProps> = ({ planet, moons }) => {
  const [orbitColor, setOrbitColor] = useState<Record<number, string>>({});

  const handleMoonClick = (moonId: number, moonIndex: number) => {
    if (!orbitColor[moonId]) {
      const assignedColor = colors[moonIndex % colors.length];
      setOrbitColor((prev) => ({ ...prev, [moonId]: assignedColor }));
    }
  };

  return (
    <div className={styles.planetRow}>
      <div className={styles.wrapper}>
      <div className={styles.planet}>{planet.title}</div>
      <div className={styles.orbitsContainer}>
        {moons.map((moon, index) => (
          <div
            key={moon.id}
            className={styles.orbit}
            style={{
              border: `2px solid ${orbitColor[moon.id] || "gray"}`,
              borderRadius: "50%",
              width: `${150 + index * 10}px`,
              height: `${150 + index * 10}px`,
            }}
          ></div>
        ))}
        <div className={styles.planetBody}></div>
      </div>
      </div>
      <div className={styles.moons}>
        {moons.map((moon, index) => (
          <Moon
            key={moon.id}
            moon={moon}
            color={orbitColor[moon.id]}
            onMoonClick={() => handleMoonClick(moon.id, index)}
          />
        ))}
      </div>
    </div>
  );
};
