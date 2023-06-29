import React from "react";
import { useContext } from "react";
import { ContextTeste } from "../context/context";
import CardFilm from "../components/CardFilm";

function Favorites() {
  const [contextState, dispatch] = useContext(ContextTeste);

  return (
    <>
      {contextState.favorites.length ? (
        <div className="container">
          <h1 className="py-3">Favoritos</h1>
          <div className="row g-3">
            {contextState.favorites.map((filme) => (
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
