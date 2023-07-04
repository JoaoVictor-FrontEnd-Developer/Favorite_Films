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
  const [filterList, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  
  // verificando se o usuário está clicando fora da lista de filtros do input
  window.addEventListener("click", (e) => {
    if (e.target.id === "filter-item" || e.target.id === "filter-input") return;
    else setFocus(false);
  });

  const handleInput = (e) => {
    setSearch(e.target.value);

    getFilmeList(search);
  };

  const getFilmeList = (search) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=87b7a9ceed5e2787d289232560b21c76&query=${search}`
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilterList(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
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
                id="filter-input"
                onFocus={() => {
                  setFocus(true);
                }}
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                value={search}
                onChange={handleInput}
              />

              <button
                className="d-flex justify-content-center 
                align-items-center btn btn-outline-primary rounded-circle"
                data-bs-dismiss="offcanvas"
                type="submit"
              >
                <BiSearch />
              </button>
            </form>

            {search !== "" && filterList.length > 0 && focus && (
              <div
                id="filter-search"
                className={`bg-body-tertiary overflow-y-auto overflow-x-hidden`}
              >
                {filterList.map((filme) => (
                  <div className="container" key={filme.id}>
                    <p
                      id="filter-item"
                      data-bs-dismiss="offcanvas"
                      onClick={() => {
                        setSearch(filme.title);
                        navigate(`/search?q=${filme.title}`);
                        setFocus(false);
                      }}
                    >
                      {filme.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
