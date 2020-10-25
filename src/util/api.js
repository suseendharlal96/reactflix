const API_KEY = process.env.REACT_APP_NETFLIX_API;

const api = [
  {
    api: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    title: "NetflixOriginals",
  },
  {
    api: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    title: "Trending Now",
  },
  {
    api: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    title: "Top Rated",
  },
  {
    api: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    title: "Action Movies",
  },
  {
    api: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    title: "Comedy Movies",
  },
  {
    api: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    title: "Horror Movies",
  },
  {
    api: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    title: "Romance Movies",
  },
  {
    api: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    title: "Documentaries",
  },
  ,
];

export default api;
