import React, { useRef, useState, memo } from 'react';
import styles from './TwoFactorAuth.module.css';

interface TwoFactorAuthProps {
  onComplete: (code: number) => void;
  segments: number;
}

interface InputProps {
  value: string;
  index: number;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}

const Input = memo(({ value, index, disabled, onChange, onKeyDown, inputRef }: InputProps) => {
  return (
    <input
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e, index)}
      onKeyDown={(e) => onKeyDown(e, index)}
      ref={inputRef}
      disabled={disabled}
      className={`${styles.input} ${disabled ? styles.disabled : ""}`}
    />
  );
});

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onComplete, segments }) => {
  const inputs = Array.from({ length: segments });
  const [values, setValues] = useState(Array.from({ length: segments }, () => ""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (index < inputs.length - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }

      if (index === inputs.length - 1) {
        if (newValues.every((val) => val !== "")) {
          onComplete(Number(newValues.join("")));
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newValues = [...values];

      if (newValues[index] === "" && index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 0);
      } else {
        newValues[index] = "";
        setValues(newValues);
      }
    }
  };

  const isDisabled = (index: number) => {
    return index > 0 && values[index - 1] === "";
  };

  return (
    <form>
      <h3 className={styles.title}>Two-factor authentication</h3>
      <div className={styles.inputsWrapper}>
        {inputs.map((_, index) => (
          <Input
            key={index}
            value={values[index]}
            index={index}
            disabled={isDisabled(index)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            inputRef={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
          />
        ))}
      </div>
    </form>
  );
};

export default TwoFactorAuth;
