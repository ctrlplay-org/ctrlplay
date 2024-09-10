import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage';
import LogIn from './pages/LogIn/LogIn';
import Footer from './components/Footer/Footer';
import AddGamePage from './pages/AddGamePage/AddGamePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import GameDetailsPage from './pages/GameDetailsPage/GameDetailsPage';
import IsPrivate from './components/IsPrivate/IsPrivate';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addgame" element={<IsPrivate><AddGamePage /></IsPrivate>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/games/:gameId" element={<GameDetailsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
