import React, { useRef, useState } from 'react';
import styles from './TwoFactorAuth.module.css';

interface TwoFactorAuthProps {
  onComplete: (code: number) => void;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onComplete }) => {
  const inputs = Array.from({ length: 6 });
  const [values, setValues] = useState(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (value && index === inputs.length - 1) {
        if (newValues.every((val) => val !== "")) {
          onComplete(Number(newValues.join("")));
          inputRefs.current[index]?.blur();
        }
      }
    }
  };

  return (
    <form>
      <h3 className={styles.title}>Two-factor authentication</h3>
      <div className={styles.inputsWrapper}>
        {inputs.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleInputChange(e, index)}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            className={styles.input}
          />
        ))}
      </div>
    </form>
  );
};

export default TwoFactorAuth;
