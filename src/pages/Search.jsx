import React from "react";
import { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import CardFilm from "../components/CardFilm";

function Search() {
  const [filmes, setFilmes] = useState([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  console.log(filmes)
    

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=87b7a9ceed5e2787d289232560b21c76&query=${query}`
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilmes(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="container">
          <h1 className="py-3">Resultados para: <span className="text-primary">{query}</span></h1>
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
            <div className="container text-center py-3">
            <h4>Filme não encontrado</h4>
            </div>
        )}
      </div>
    </div>
  );
}

export default Search;
