import React, { createContext, useReducer, useContext, HTMLAttributes, useRef } from 'react';
import styles from './SliderRoot.module.css';

type SliderState = {
  value?: number;
  minValue?: number;
  maxValue?: number;
};

type SliderAction = 
  { type: 'SET_VALUE'; payload: number } 
  | { type: 'SET_MIN_VALUE'; payload: number }
  | { type: 'SET_MAX_VALUE'; payload: number };

type SliderContextType = {
  state: SliderState;
  dispatch: React.Dispatch<SliderAction>;
  calculateNewValue: (clientX: number) => number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  isRange: boolean;
};

const SliderContext = createContext<SliderContextType | null>(null);

const actionHandlers: Record<SliderAction['type'], (state: SliderState, payload: number) => SliderState> = {
  SET_VALUE: (state, payload) => ({ ...state, value: payload }),
  SET_MIN_VALUE: (state, payload) => ({ ...state, minValue: Math.min(payload, state.maxValue ?? 100) }),
  SET_MAX_VALUE: (state, payload) => ({ ...state, maxValue: Math.max(payload, state.minValue ?? 0) }),
};

const sliderReducer = (state: SliderState, action: SliderAction): SliderState => {
  return actionHandlers[action.type] ? actionHandlers[action.type](state, action.payload) : state;
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliderContext must be used within a SliderProvider');
  }
  return context;
};

export const SliderRoot: React.FC<HTMLAttributes<HTMLDivElement> & { isRange?: boolean }> = ({ children, isRange = false, ...props }) => {
  const initialState: SliderState = isRange
  ? { minValue: 20, maxValue: 80 }
  : { value: 50 };

  const [state, dispatch] = useReducer(sliderReducer, initialState);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const calculateNewValue = (clientX: number): number => {
    if (!trackRef.current) return 0;

    const rect = trackRef.current.getBoundingClientRect();
    // return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
  };

  return (
    <SliderContext.Provider value={{ state, dispatch, calculateNewValue, trackRef, isRange }}>
      <div {...props} className={styles.root}>
        {children}
      </div>
    </SliderContext.Provider>
  );
};
