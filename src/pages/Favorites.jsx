import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextTeste } from "../context/context";
import CardFilm from "../components/CardFilm";

function Favorites() {
  const [contextState] = useContext(ContextTeste); 
  
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      {contextState.favorites.length ? (
        <div className="container">
          <h1 className="py-3">Favoritos</h1>
          <div className="my-2 row g-3">
            {contextState.favorites.slice(0).reverse().map((filme) => (
              <CardFilm
                key={filme.id}
                id={filme.id}
                title={filme.title}
                poster={filme.poster_path}
                nota={filme.vote_average}
                filme={filme}
              />
            ))}
          </div>
        </div>
      ) : (
          <div className="container text-center py-3">
            <h4>Nenhum filme favoritado</h4>
            </div>
      )}
    </>
  );
}

export default Favorites;
