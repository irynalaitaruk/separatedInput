import React, { HTMLAttributes } from 'react';
import styles from './SliderThumb.module.css';
import { useSliderContext } from './SliderRoot';

type SliderThumbProps = HTMLAttributes<HTMLDivElement> & {
  type: 'min' | 'max';
};

export const SliderThumb: React.FC<SliderThumbProps> = ({ type, ...props }) => {
  const { state, dispatch, calculateNewValue } = useSliderContext();

  const handleMouseDown = () => {
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = calculateNewValue(e.clientX);
      if (type === 'min') {
        dispatch({ type: 'SET_MIN_VALUE', payload: newValue });
      } else {
        dispatch({ type: 'SET_MAX_VALUE', payload: newValue });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const position = type === 'min' ? state.minValue : state.maxValue;

  return <div {...props} className={styles.thumb} style={{ left: `${position}%` }} onMouseDown={handleMouseDown} />;
};
