import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./MyList.css";

const MyList = (props) => {
  const img_url = "https://image.tmdb.org/t/p/original/";
  const history = useHistory();
  const [favList, setMyList] = useState(null);
  useEffect(() => {
    if (props.email) {
      getMyList();
    } else {
      history.push("/auth");
    }
  }, [props]);

  const [getMyList, { loading }] = useLazyQuery(GET_MY_LIST, {
    onCompleted(data) {
      setMyList(data?.getMyList);
    },
    onError(err) {},
    fetchPolicy: "cache-and-network",
  });

  const [removeFromList, { loading: removing }] = useMutation(
    REMOVE_FROM_LIST,
    {
      onCompleted(data) {
        getMyList();
      },
      onError(err) {},
    }
  );

  return (
    <div className="mylist-container">
      <div className="wrapper">
        {loading ? (
          <p>Loading..</p>
        ) : (
          <div className="list-items">
            {/* <OwlCarousel items={3} className="owl-theme" margin={15}> */}
            {favList &&
              favList.length > 0 &&
              favList.map((movie) => (
                <div className="list" key={movie.id}>
                  <img
                    style={{ height: "500px", transition: "all 0.5s" }}
                    key={movie.id}
                    src={`${img_url}${movie?.image}`}
                    alt={movie.title}
                  />
                  <div className="list-desc">
                    <h2>{movie?.name}</h2>
                    <button
                      className="form-btn"
                      style={{ width: "auto" }}
                      onClick={() =>
                        removeFromList({ variables: { id: movie.id } })
                      }
                    >
                      {removing ? "Removing.." : "Remove from list"}
                    </button>
                  </div>
                </div>
              ))}
            {/* </OwlCarousel> */}
          </div>
        )}
      </div>
    </div>
  );
};

const GET_MY_LIST = gql`
  query getMyList {
    getMyList {
      id
      name
      date
      rating
      overview
      image
    }
  }
`;

const REMOVE_FROM_LIST = gql`
  mutation removeList($id: Int!) {
    removeFromMyList(id: $id)
  }
`;

const mapStateToProps = ({ authReducer }) => ({
  email: authReducer?.authData?.email,
});

export default connect(mapStateToProps)(MyList);
