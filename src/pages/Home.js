import React from "react";

import MovieApi from "../util/api";
import MovieSection from "../components/MovieSection";
import CoverPic from "../components/CoverPic";

const Home = () => {
  return (
    <>
      <CoverPic />
      <div className="container">
        {MovieApi.length &&
          MovieApi.map((movieApi) => (
            <MovieSection
              key={movieApi.title}
              title={movieApi.title}
              api={movieApi.api}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
