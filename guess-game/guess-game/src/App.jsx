import {Routes,Route} from 'react-router-dom';
import StartScreen from './pages/StartScreen.jsx';
import GameScreen from './pages/GameScreen.jsx';
import ResultScreen from './pages/EndScreen.jsx';


function App() {
  return (
    <Routes>
      <Route path='/' element={<StartScreen/>}/>
      <Route path='/game' element={<GameScreen/>}/>
      <Route path='/result' element={<ResultScreen/>}/>
    </Routes>
  )
}

export default App;