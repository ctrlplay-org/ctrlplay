import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
