import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ContextTeste } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import { PiFilmReelFill } from "react-icons/pi";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { BiSearch } from "react-icons/bi";

import "./NavBar.css";

function NavBar() {
  const [contextState, dispatch] = useContext(ContextTeste);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
  };

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-bs-theme", contextState.darkMode ? "dark" : "light");
  }, [contextState.darkMode]);

  return (
    <nav className="sticky-top py-3 navbar navbar-expand-lg bg-body-tertiary border-bottom border-bottom-dark">
      <div className="container container-fluid">
        <Link to="/" className="navbar-brand">
          <PiFilmReelFill className="h1 my-0" />
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
            <ul className="navbar-nav d-flex justify-content-end align-items-lg-center flex-grow-1 pe-3">
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
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <button
                  className="nav-link"
                  onClick={() => dispatch({ type: "CHANGE_THEME" })}
                >
                  <WiMoonAltThirdQuarter className="my-0 h4" />
                </button>
              </li>
            </ul>

            <form
              onSubmit={handleSubmit}
              className="d-flex mt-lg-0 mt-2"
              role="search"
            >
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                onChange={handleInput}
              />
              <button
                className="d-flex justify-content-center align-items-center btn btn-outline-primary rounded-circle"
                data-bs-dismiss="offcanvas"
                type="submit"
              >
                <BiSearch/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
