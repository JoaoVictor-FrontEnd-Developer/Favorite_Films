import { useState, useEffect } from "react";
import React from "react";
import CardFilm from "../components/CardFilm";

function Home() {
  
  const [filmes, setFilmes] = useState([]);
  const [category, setCategory] = useState('popular');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=87b7a9ceed5e2787d289232560b21c76`
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilmes(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="container">
      <h1 className="py-3">Filmes</h1>
      <div className="d-flex flex-wrap">
      <button onClick={() => setCategory('popular')} type="button" className={`${category == 'popular' ? 'active' : ''} me-2 mb-2 btn rounded-pill`} >Popular</button>
        <button onClick={() => setCategory('now_playing')} type="button" className={`${category == 'now_playing' ? 'active' : ''} me-2 mb-2 btn rounded-pill`}>Em Exibição</button>
        <button onClick={() => setCategory('top_rated')} type="button" className={`${category == 'top_rated' ? 'active' : ''} me-2 mb-2 btn rounded-pill`}>Melhor classificação</button>
        <button onClick={() => setCategory('upcoming')} type="button"className={`${category == 'upcoming' ? 'active' : ''} me-2 mb-2 btn rounded-pill`}>Em breve</button>
      </div>
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
