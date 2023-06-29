import React from "react";
import { useContext, useState } from "react";
import { ContextTeste } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";

import "./NavBar.css";

function NavBar() {

  const [contextState, dispatch] = useContext(ContextTeste);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  const handleInput = (e) => {
    setSearch(e.target.value)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return
    
    navigate(`/search?q=${search}`)
    
  }

  return (
    <nav className="sticky-top py-3 navbar navbar-expand-lg bg-light border-bottom border-bottom-dark">
      <div className="container container-fluid">
        <Link to="/" className="navbar-brand">
          <PiFilmSlate className="h1 my-0" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
          {contextState.favorites.length !== 0 && (
            <span className="span-mobile">{contextState.favorites.length}</span>
          )}
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link to="/" className="nav-link">
                  Início
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link to="/favorites" className="nav-link">
                  Favoritos
                  {contextState.favorites.length !== 0 && (
                    <span>{contextState.favorites.length}</span>
                  )}
                </Link>
              </li>
            </ul>

            <form onSubmit={handleSubmit}  className="d-flex mt-lg-0 mt-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                onChange={handleInput}
              />
              <button className="btn btn-outline-primary" data-bs-dismiss="offcanvas" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
