import { useState } from "react";
import { Moon } from "./Moon";
import { IMoons, IPlanet } from './constants';
import styles from './Planet.module.css';

const colors = ["green", "blue", "purple"];

interface PlanetProps {
  planet: IPlanet;
  moons: IMoons[];
}

export const Planet: React.FC<PlanetProps> = ({ planet, moons }) => {
  const [orbitColor, setOrbitColor] = useState<Record<number, string>>({});

  const handleMoonToggle = (moonId: number, moonIndex: number) => {
    setOrbitColor((prev) => {
      if (prev[moonId]) {
        const updatedColors = { ...prev };
        delete updatedColors[moonId];
        return updatedColors;
      } else {
        const assignedColor = colors[moonIndex % colors.length];
        return { ...prev, [moonId]: assignedColor };
      }
    });
  };

  const moonElements = moons.map((moon, index) => ({
    orbit: (
      <div
        key={`orbit-${moon.id}`}
        className={styles.orbit}
        style={{
          border: `${orbitColor[moon.id] ? 2 : 1}px solid ${
            orbitColor[moon.id] || "gray"
          }`,
          borderRadius: "50%",
          width: `${150 + index * 10}px`,
          height: `${150 + index * 10}px`,
        }}
      ></div>
    ),
    moon: (
      <Moon
        key={`moon-${moon.id}`}
        moon={moon}
        color={orbitColor[moon.id]}
        onMoonClick={() => handleMoonToggle(moon.id, index)}
      />
    ),
  }));

  return (
    <div className={styles.planetRow}>
      <div className={styles.wrapper}>
        <div className={styles.planet}>{planet.title}</div>
        <div className={styles.orbitsContainer}>
          {moonElements.map(({ orbit }) => orbit)}
          <div className={styles.planetBody}></div>
        </div>
      </div>
      <div className={styles.moons}>
        {moonElements.map(({ moon }) => moon)}
      </div>
    </div>
  );
};
