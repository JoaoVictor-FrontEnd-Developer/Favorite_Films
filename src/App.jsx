import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Search from './pages/Search';


function App() {

  return (

    <Router >
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
      <Footer/>
      </Router>
      
  
  );
}

export default App;
