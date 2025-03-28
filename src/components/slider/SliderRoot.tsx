import React, { createContext, useReducer, useContext, HTMLAttributes, useRef } from 'react';
import styles from './SliderRoot.module.css';

type SliderState = {
  minValue: number;
  maxValue: number;
};

type SliderAction = 
   { type: 'SET_MIN_VALUE'; payload: number }
  | { type: 'SET_MAX_VALUE'; payload: number };

type SliderContextType = {
  state: SliderState;
  dispatch: React.Dispatch<SliderAction>;
  calculateNewValue: (clientX: number) => number;
  trackRef: React.RefObject<HTMLDivElement | null>;
};

const SliderContext = createContext<SliderContextType | null>(null);

const sliderReducer = (state: SliderState, action: SliderAction): SliderState => {
  switch (action.type) {
    case 'SET_MIN_VALUE':
      return { ...state, minValue: Math.min(action.payload, state.maxValue) };
    case 'SET_MAX_VALUE':
      return { ...state, maxValue: Math.max(action.payload, state.minValue) };
    default:
      return state;
  }
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliderContext must be used within a SliderProvider');
  }
  return context;
};

export const SliderRoot: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(sliderReducer, { minValue: 20, maxValue: 80 });
  const trackRef = useRef<HTMLDivElement | null>(null);

  const calculateNewValue = (clientX: number): number => {
    if (!trackRef.current) return 0;

    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
  };

  return (
    <SliderContext.Provider value={{ state, dispatch, calculateNewValue, trackRef }}>
      <div {...props} className={styles.root}>
        {children}
      </div>
    </SliderContext.Provider>
  );
};
