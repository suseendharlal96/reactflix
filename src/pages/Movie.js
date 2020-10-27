import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Movie.css";

const Movie = () => {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const img_url = "https://image.tmdb.org/t/p/original/";
  console.log(history);
  useEffect(() => {
    if (history?.location?.state?.movie) {
      setMovie(history?.location?.state?.movie);
    } else {
      history.push("/");
    }
  }, []);
  return (
    <div
      class="main-container"
      style={{
        backgroundImage: `url(${img_url}${movie?.backdrop_path})`,
        objectFit: "cover",
      }}
    >
      <div className="faded">
        <div className="content">
          <div class="img-container">
            <img
              className="movie-img"
              src={`${img_url}${movie?.poster_path}`}
            />
          </div>
          <div className="desc-container">
            <div className="desc">
              <h2>{movie?.name || movie?.original_name || movie?.title}</h2>
              <h3>First aired on: {movie?.first_air_date}</h3>
              <h3>Rating: {movie?.vote_average}</h3>
              <h3>Overview:</h3>
              <h4>{movie?.overview}</h4>
              <button className="list-btn">Add to My List</button>
              <button className="list-btn" onClick={() => history.push("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
