import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ReservaScreen from './screens/ReservaScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/:slug" element={<ReservaScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;