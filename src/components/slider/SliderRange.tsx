import React, { HTMLAttributes } from 'react';
import styles from './SliderRange.module.css';
import { useSliderContext } from './SliderRoot';

type SliderRangeProps = HTMLAttributes<HTMLDivElement>;

export const SliderRange: React.FC<SliderRangeProps> = ({ ...props }) => {
  const { state } = useSliderContext();

  return (
    <div
      {...props}
      className={styles.range}
      style={{
        left: `${state.minValue}%`,
        width: `${state.maxValue - state.minValue}%`,
      }}
    />
  );
};
