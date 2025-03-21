import './App.css'
import React, { useState, useRef } from 'react';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from './components/slider';

const App: React.FC = () => {
  const [value, setValue] = useState(50);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const calculateNewValue = (clientX: number) => {
    if (!trackRef.current) return 0;

    const rect = trackRef.current.getBoundingClientRect();
    const newValue = Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 0),
      100
    );
    return newValue;
  };

  const handleThumbMove = (e: MouseEvent) => {
    const newValue = calculateNewValue(e.clientX);
    setValue(newValue);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleThumbMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleThumbMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newValue = calculateNewValue(e.clientX);
    setValue(newValue);
  };

  return (
    <SliderRoot>
      <SliderTrack
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <SliderRange
          style={{ width: `${value}%` }}
        />
        <SliderThumb
          style={{ left: `${value}%` }}
          onMouseDown={handleMouseDown}
        />
      </SliderTrack>
    </SliderRoot>
  );
};

export default App
