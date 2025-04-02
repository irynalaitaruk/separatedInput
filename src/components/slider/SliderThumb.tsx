import React, { HTMLAttributes } from 'react';
import styles from './SliderThumb.module.css';
import { useSliderContext } from './SliderRoot';

type SliderThumbProps = HTMLAttributes<HTMLDivElement> & {
  type: 'min' | 'max' | 'single';
};

export const SliderThumb: React.FC<SliderThumbProps> = ({ type = 'single', ...props }) => {
  const { state, dispatch, calculateNewValue, isRange } = useSliderContext();

  const handleMouseDown = () => {
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = calculateNewValue(e.clientX);
      if (isRange) {
        if (type === 'min') {
          dispatch({ type: 'SET_MIN_VALUE', payload: newValue });
        } else if (type === 'max') {
          dispatch({ type: 'SET_MAX_VALUE', payload: newValue });
        }
      } else {
        dispatch({ type: 'SET_VALUE', payload: newValue });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const position = isRange ? (type === 'min' ? state.minValue! : state.maxValue!) : state.value;

  return (
    <div 
      {...props} 
      className={styles.thumb} 
      style={{ left: `${position}%` }} 
      onMouseDown={handleMouseDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
    />
  );
};
