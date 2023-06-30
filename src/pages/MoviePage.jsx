import React from "react";
import { useEffect, useState, useContext } from "react";
import { ContextTeste } from "../context/context";
import { useParams } from "react-router-dom";
import { BsStarFill, BsFillCalendarFill } from "react-icons/bs";

function MoviePage() {
  const [contextState, dispatch] = useContext(ContextTeste);
  const [filme, setFilme] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [visible, setVisible] = useState(false);
  const params = useParams();
  console.log(filme)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=87b7a9ceed5e2787d289232560b21c76&append_to_response=videos`
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilme(response);
        setTrailer(response.videos.results[0].key);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    
    <div className="my-5 container">
      <div className="card border-0 mb-3">
        <div className="row g-0">
          <div className="col-md-4">
          {filme.poster_path ? (
              <img
              src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              className="img-fluid rounded"
              alt="..."
            />
          ) : (
              <div className="card-null-horizontal img-fluid rounded-start"></div>
              )}
            
          </div>
          <div className="col-md-8">
            <div className="p-lg-5 card-body">
              <h5 className="h1 card-title">{filme.title}</h5>
              <p className="card-text">{filme.overview}</p>
              <p className="mt-5 card-text">
                <small className="d-flex text-body-secondary">
                  <BsStarFill className="h5 text-warning me-2" />
                  {filme.vote_average}
                </small>
              </p>
              <p className="mb-5 card-text">
                <small className="d-flex text-body-secondary">
                  <BsFillCalendarFill className="h5 text-warning me-2" />
                  {filme.release_date}
                </small>
              </p>
              <button
                onClick={() => {
                  dispatch({ type: "FAVORITE", payload: filme });
                }}
                className={`btn  ${
                  contextState.id.includes(filme.id)
                    ? "btn-danger"
                    : "btn-primary"
                }`}
              >
                {contextState.id.includes(filme.id) ? "Remover" : "Favoritar"}
              </button>
              <button
                className="ms-2 btn btn-primary"
                onClick={() => setVisible(!visible)}
              >
                Trailer
              </button>
            </div>
          </div>
        </div>
          </div>
        
      {visible && (
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${trailer}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
      </div>
      
  );
}

export default MoviePage;
