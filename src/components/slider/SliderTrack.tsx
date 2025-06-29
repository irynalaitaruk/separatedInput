import React, { forwardRef, HTMLAttributes } from 'react';
import styles from './SliderTrack.module.css';
import { useSliderContext } from './SliderRoot';

type SliderTrackProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(({ children, ...props }, ref) => {
  const { trackRef, calculateNewValue, dispatch, state, isRange } = useSliderContext();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current ) return;
    const newValue = calculateNewValue(event.clientX);

    if (isRange) {
      const distanceToMin = Math.abs(newValue - (state.minValue ?? 0));
      const distanceToMax = Math.abs(newValue - (state.maxValue ?? 100));

      if (distanceToMin < distanceToMax) {
        dispatch({ type: 'SET_MIN_VALUE', payload: newValue });
      } else {
        dispatch({ type: 'SET_MAX_VALUE', payload: newValue });
      }
    } else {
      dispatch({ type: 'SET_VALUE', payload: newValue });
    }
  };

  return (
    <div
      {...props}
      ref={(el) => {
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
        trackRef.current = el;
      }}
      className={styles.track}
      onClick={handleClick}
      role="wrapper"
      aria-label="Slider control"
    >
      {children}
    </div>
  );
});
