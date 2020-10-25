import React, { useState, useEffect } from "react";

import axios from "../util/axios";
import "./MovieSection.css";

const MovieSection = ({ title, api }) => {
  const img_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovieApi = async () => {
      const res = await axios.get(api);
      console.log(res);
      setMovies(res.data.results);
    };
    fetchMovieApi();
  }, [title]);
  return movies ? (
    <div>
      <div>
        <h2 className="title">{title}</h2>
        <div className="movie-container">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`cover-pic ${
                title === "NetflixOriginals" && "big-cover-pic"
              }`}
              src={`${img_url}${movie.poster_path}`}
              alt={movie.title}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading..</p>
  );
};

export default MovieSection;
