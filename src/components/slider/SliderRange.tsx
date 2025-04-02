import React, { HTMLAttributes, useEffect } from 'react';
import styles from './SliderRange.module.css';
import { useSliderContext } from './SliderRoot';

type SliderRangeProps = HTMLAttributes<HTMLDivElement> & {
  onChange?: (min: number, max: number) => void;
};

export const SliderRange: React.FC<SliderRangeProps> = ({ onChange, ...props }) => {
  const { state, isRange } = useSliderContext();

  useEffect(() => {
    if (onChange && state.minValue !== undefined && state.maxValue !== undefined) {
      onChange(state.minValue, state.maxValue);
    }
  }, [state.minValue, state.maxValue, onChange]);

  return (
    <div
      {...props}
      className={styles.range}
      style={
        isRange ? { left: `${state.minValue}%`, width: `${state.maxValue! - state.minValue!}%` } : { left: `0%`, width: `${state.value}%`
      }}
      role="range"
    />
  );
};
