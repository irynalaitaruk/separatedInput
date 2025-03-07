import TwoFactorAuth from './components/two-factor-auth/TwoFactorAuth';
import './App.css'

function App() {
  const handleComplete = (code: number) => {
    console.log("Your code:", code);
  };
  return (
    <TwoFactorAuth onComplete={handleComplete}/>
  )
}

export default App
