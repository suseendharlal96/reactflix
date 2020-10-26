import "./App.css";
import MovieApi from "./util/api";
import MovieSection from "./components/MovieSection";
import Navbar from "./components/Navbar";
import CoverPic from "./components/CoverPic";

function App() {
  return (
    <>
      <Navbar />
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
}

export default App;
