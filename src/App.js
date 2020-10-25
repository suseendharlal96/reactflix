import "./App.css";
import MovieApi from "./util/api";
import MovieSection from "./components/MovieSection";

function App() {
  return (
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
  );
}

export default App;
