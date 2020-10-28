import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import "./Movie.css";

const Movie = (props) => {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [movieExists, setMovieExists] = useState(false);
  const img_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    if (history?.location?.state?.movie) {
      window.scrollTo(0, 0);
      setMovie(history?.location?.state?.movie);
    } else {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    if (props.myList && props.myList.length > 0) {
      const exist = props.myList.find((list) => list.id === movie?.id);
      if (exist) {
        setMovieExists(true);
      } else {
        setMovieExists(false);
      }
    }
  }, [movie]);
  const [addToMyList, { loading }] = useMutation(ADD_TO_MYLIST, {
    onCompleted(data) {
      alert(data.addToMyList);
    },
    onError(err) {},
  });
  const addToList = () => {
    addToMyList({
      variables: {
        id: movie.id,
        name: movie?.name || movie?.original_name || movie?.title,
        date: movie?.first_air_date || movie?.release_date,
        rating: movie?.vote_average,
        overview: movie?.overview,
        image: movie?.poster_path,
      },
    });
  };
  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${img_url}${movie?.backdrop_path})`,
        // objectFit: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "50% 50%",
      }}
    >
      <div className="faded">
        <div className="content">
          <div className="img-container">
            <img
              className="movie-img"
              src={`${img_url}${movie?.poster_path}`}
            />
          </div>
          <div className="desc-container">
            <div className="desc">
              <h2>{movie?.name || movie?.original_name || movie?.title}</h2>
              <h3>
                First aired on: {movie?.first_air_date || movie?.release_date}
              </h3>
              <h3>Rating: {movie?.vote_average}</h3>
              <h3>Overview:</h3>
              <h4>{movie?.overview}</h4>
              {props.email ? (
                movieExists ? (
                  <button className="list-btn" disabled>
                    Already in My List
                  </button>
                ) : (
                  <button className="list-btn" onClick={addToList}>
                    {loading ? "Adding.." : "Add to My List"}
                  </button>
                )
              ) : (
                <button
                  className="list-btn"
                  onClick={() => history.push("/auth")}
                >
                  Login to add to My List
                </button>
              )}
              {/* <button
                className="list-btn"
                disabled={props.email === undefined}
                onClick={addToList}
              >
                {props.email === undefined
                  ? "Login to add to My List"
                  : loading
                  ? "Adding.."
                  : "Add to My List"}
              </button> */}
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

const ADD_TO_MYLIST = gql`
  mutation addToList(
    $id: Int!
    $name: String!
    $date: String!
    $overview: String!
    $rating: Float!
    $image: String!
  ) {
    addToMyList(
      id: $id
      name: $name
      date: $date
      overview: $overview
      rating: $rating
      image: $image
    )
  }
`;

const mapStateToProps = ({ authReducer }) => ({
  email: authReducer?.authData?.email,
  myList: authReducer?.authData?.myList,
});

export default connect(mapStateToProps)(Movie);
