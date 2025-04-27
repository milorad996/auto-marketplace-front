import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/Navbar';
import HomeCars from './pages/HomeCars';
import Register from './pages/Register';
import Footer from './components/Footer';
import Login from './pages/Login';
import FilteredCars from './pages/FilteredCars';
import SellCarPage from './pages/SellCarPage';
import AboutUs from './pages/AboutUs';
import SingleCar from './pages/SingleCar';


function App() {
  return (
    <div className="App">
      <NavbarComponent />

      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<HomeCars />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/filtered-cars' element={<FilteredCars />} />
          <Route exact path='/sell' element={<SellCarPage />} />
          <Route exact path='/about' element={<AboutUs />} />
          <Route exact path='/single-car/:id' element={<SingleCar />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App;
