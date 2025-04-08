import { SegmentedInput } from './components/segmented-input/SegmentedInput';
import './App.css'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from './components/slider';

const App: React.FC = () => {

  const handleComplete = (code: number) => {
    console.log("Your code:", code);
  };

  return (
    <>
    <SliderRoot>
      <SliderTrack>
        <SliderRange/>
        <SliderThumb type="min" />
        <SliderThumb type="max" />
      </SliderTrack>
    </SliderRoot>
    <SegmentedInput segments={6} onComplete={handleComplete}/>
    </>
  );
};
   

export default App
