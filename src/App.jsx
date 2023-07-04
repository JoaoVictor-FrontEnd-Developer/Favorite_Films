import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Search from './pages/Search';
import MoviePage from './pages/MoviePage';

import { useContext, useEffect} from "react";
import { ContextTeste } from "./context/context";
import ButtonBackToTop from './components/ButtonBackToTop';


function App() {

  const [contextState] = useContext(ContextTeste)

  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(contextState))
  }, [contextState])

  return (

    <Router >
      <NavBar />
      <ButtonBackToTop/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/moviepage/:id" element={<MoviePage />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
      <Footer/>
      </Router>
      
  
  );
}

export default App;
