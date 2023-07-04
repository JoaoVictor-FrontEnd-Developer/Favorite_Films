import { useContext } from "react";
import { ContextTeste } from "../context/context";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";

function CardFilm({ id, title, poster, nota, filme }) {
  const [contextState, dispatch] = useContext(ContextTeste);

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-6" key={id}>
      <div className="card ">
        <Link to={`/moviepage/${id}`}>
          {poster ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              className="card-img-top"
              alt="..."
            />
          ) : (
            <div className="card-null card-img-top"></div>
          )}
        </Link>
        <div className="card-body d-flex flex-column justify-content-between">
          <Link className="card-title" to={`/moviepage/${id}`}>
            <h5>{title}</h5>
          </Link>
          <p className="card-text d-flex align-items-center">
            <BsStarFill className="text-warning me-2" />
            {nota.toFixed(1)}
          </p>

          <button
            onClick={() => {
              dispatch({ type: "FAVORITE", payload: filme });
            }}
            className={`btn ${
              contextState.id.includes(id) ? "btn-danger" : "btn-primary"
            }`}
          >
            {contextState.id.includes(id) ? "Remover" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFilm;
