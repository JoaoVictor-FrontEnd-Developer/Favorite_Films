import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardFilmHorizontal from "../components/CardFilmHorizontal";

function MoviePage() {
  const [filme, setFilme] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [visible, setVisible] = useState(false);
  const params = useParams();
  

  const handleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=87b7a9ceed5e2787d289232560b21c76&append_to_response=videos`
    )
      .then(async (resp) => {
        const response = await resp.json();
        setFilme(response);
        setTrailer(
          response.videos.results.filter((video) =>
            video.type.includes("Trailer")
          )[0].key
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {filme.length !== 0 ? (
        <div className="d-flex flex-column align-items-center my-5 container">
          <CardFilmHorizontal
            filme={filme}
            id={filme.id}
            title={filme.title}
            poster={filme.poster_path}
            overview={filme.overview}
            vote={filme.vote_average}
            release={filme.release_date}
            visible={visible}
            onHandleVisible={handleVisible}
          />

          {visible && (
            <iframe
              className="mt-4"
              id="trailer"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default MoviePage;
