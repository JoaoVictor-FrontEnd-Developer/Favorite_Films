import { useState, useEffect } from "react";
import React from "react";
import CardFilm from "../components/CardFilm";

function Home() {
  
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=87b7a9ceed5e2787d289232560b21c76"
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilmes(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="py-3">Top Filmes</h1>

      <div className="my-2 row g-3">
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <CardFilm
              key={filme.id}
              id={filme.id}
              title={filme.title}
              poster={filme.poster_path}
              nota={filme.vote_average}
              filme={filme}
            />
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
