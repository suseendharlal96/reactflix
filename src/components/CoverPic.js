import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Api from "../util/api";
import axios from "../util/axios";
import "./CoverPic.css";

const CoverPic = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchRandomMovie = async () => {
      const res = await axios.get(Api[0].api);
      if (res) {
        setRandomMovie(
          res.data.results[Math.floor(Math.random() * res.data.results.length)]
        );
      }
    };
    fetchRandomMovie();
  }, []);
  return (
    <div
      className="cover-img"
      style={{
        backgroundImage: `url( "https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}")`,
      }}
    >
      <div className="cover-contents">
        <h1>
          {randomMovie?.title ||
            randomMovie?.name ||
            randomMovie?.original_name}
        </h1>
        <div className="btn-container">
          <button className="cover-button">Play</button>
          <button
            className="cover-button"
            onClick={() => history.push("/mylist")}
          >
            My List
          </button>
        </div>
        <p
          className="description"
          title={
            randomMovie?.overview.length > 150 ? randomMovie?.overview : null
          }
        >
          {randomMovie?.overview.length > 150
            ? randomMovie?.overview.substr(0, 150) + "..."
            : randomMovie?.overview}
        </p>
      </div>
      <div className="faded-container"></div>
    </div>
  );
};

export default CoverPic;
