import React from "react";
import { useContext } from "react";
import { ContextTeste } from "../context/context";
import { BsStarFill, BsFillCalendarFill } from "react-icons/bs";

function CarFilmHorizontal({
  filme,
  title,
  poster,
  overview,
  vote,
  release,
  onHandleVisible,
}) {
  const [contextState, dispatch] = useContext(ContextTeste);

  return (
    <div className="card border-0 mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {poster ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              className="img-fluid rounded"
              alt="..."
            />
          ) : (
            <div className="card-null-horizontal img-fluid rounded-start"></div>
          )}
        </div>
        <div className="col-md-8">
          <div className="p-lg-5 card-body">
            <h5 className="h1 card-title">{title}</h5>
            <p className="card-text">{overview}</p>
            <p className="mt-5 card-text">
              <small className="d-flex text-body-secondary">
                <BsStarFill className="h5 text-warning me-2" />
                {vote}
              </small>
            </p>
            <p className="mb-5 card-text">
              <small className="d-flex text-body-secondary">
                <BsFillCalendarFill className="h5 text-warning me-2" />
                {release}
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
              onClick={() => onHandleVisible()}
            >
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarFilmHorizontal;
