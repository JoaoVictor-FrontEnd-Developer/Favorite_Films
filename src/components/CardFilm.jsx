import { useContext} from "react";
import { ContextTeste } from "../context/context";
import {BsStarFill} from 'react-icons/bs'
import React from 'react'

function CardFilm({ id, title, poster, nota, filme }) {

  const [contextState, dispatch] = useContext(ContextTeste);
  

  return (
          <div className="col-xl-3 col-lg-4 col-md-6 col-6" key={id}>
            <div className="card ">
              <img
                src={`https://image.tmdb.org/t/p/w500${poster}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{title}</h5>
                <p className="card-text d-flex align-items-center">
                  <BsStarFill className="text-warning me-2"/>{nota}
                </p>
                <button onClick={() => { dispatch({ type: "FAVORITE", payload: filme }) }}
                  className={`btn ${contextState.id.includes(id) ? 'btn-danger': 'btn-primary'}`}>
                  {contextState.id.includes(id) ? "Remover" : "Favoritar"}
                </button>
              </div>
            </div>
          </div> 
  )
}

export default CardFilm