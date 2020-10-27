import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movie from "./pages/Movie";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/movie/:id" component={Movie} />
        <Redirect from="**" to="/" />
      </Switch>
      {/* <CoverPic />
      <div className="container">
        {MovieApi.length &&
          MovieApi.map((movieApi) => (
            <MovieSection
              key={movieApi.title}
              title={movieApi.title}
              api={movieApi.api}
            />
          ))}
      </div> */}
    </BrowserRouter>
  );
}

export default App;
