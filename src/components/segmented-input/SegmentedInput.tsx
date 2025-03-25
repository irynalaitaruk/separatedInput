import React, { useRef, useState, useCallback, memo, useEffect } from 'react';
import styles from './SegmentedInput.module.css';

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

export const SegmentedInput: React.FC<TwoFactorAuthProps> = ({ onComplete, segments }) => {
  const inputs = Array.from({ length: segments });
  const [values, setValues] = useState(Array.from({ length: segments }, () => ""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      if (/^[0-9]$/.test(value) || value === "") {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < inputs.length - 1) {
          setFocusIndex(index + 1);
        }

        if (index === inputs.length - 1 && newValues.every((val) => val !== "")) {
          onComplete(Number(newValues.join("")));
        }
      }
    },
    [values, onComplete, inputs.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...values];

        if (newValues[index] === "" && index > 0) {
          setFocusIndex(index - 1);
        } else {
          newValues[index] = "";
          setValues(newValues);
        }
      }
    },
    [values]
  );

  const isDisabled = useCallback(
    (index: number) => index > 0 && values[index - 1] === "",
    [values]
  );

  const handleContainerClick = useCallback(() => {
    const firstEmptyIndex = values.findIndex((value) => value === "");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  }, [values]);

  useEffect(() => {
    if (focusIndex !== null) {
      inputRefs.current[focusIndex]?.focus();
      setFocusIndex(null);
    }
  }, [focusIndex]);

  return (
    <form>
      <h3 className={styles.title}>Two-factor authentication</h3>
      <div className={styles.inputsWrapper} onClick={handleContainerClick}>
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

