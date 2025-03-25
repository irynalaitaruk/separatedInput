import { SegmentedInput } from './components/segmented-input/SegmentedInput';
import './App.css'

function App() {
  const handleComplete = (code: number) => {
    console.log("Your code:", code);
  };
  return (
    <SegmentedInput segments={6} onComplete={handleComplete}/>
  )
}

export default App
