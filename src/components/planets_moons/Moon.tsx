import { IMoons } from './constants';
import styles from './Moon.module.css';

interface MoonProps {
  moon: IMoons;
  color: string;
  onMoonClick: () => void;
}

export const Moon: React.FC<MoonProps> = ({ moon, color, onMoonClick }) => {
  return (
    <div
      className={styles.moon}
      onClick={onMoonClick}
      style={{ backgroundColor: color || "lightgray" }}
    >
      <span className={styles.moonTitle}>{moon.title}</span>
    </div>
  );
};
