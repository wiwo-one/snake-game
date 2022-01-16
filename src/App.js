import "./App.css";
import React, { useEffect } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Snake from "./pages/Snake";
import Page2 from "./pages/Page2";
import Results from "./pages/Results";
import ResultsFirebase from "./pages/ResultsFirebase";

function App() {
  let history = useHistory();
  const onResize = () => {
    document.querySelector(":root").style.setProperty("--vh", window.innerHeight / 100 + "px");
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div>
      <div className="absolute flex items-center justify-around w-full h-6 bg-pink-600">
        {/* <a href="#/" onClick={() => history.push("/")}>
          Snake
        </a>
        <a href="#/" onClick={() => history.push("/2")}>
          Page2
        </a>
        <a href="#/" onClick={() => history.push("/results")}>
          Results
        </a> */}
        <a href="#/" onClick={() => history.push("/")}>
          Snake
        </a>
        <a href="#/2" onClick={() => history.push("/2")}>
          Page2
        </a>
        <a href="#/results" onClick={() => history.push("/results")}>
          Results
        </a>
        <a href="#/results-firebase" onClick={() => history.push("/results-firebase")}>
          ResultsFirebase
        </a>
      </div>

      <Switch>
        <Route exact path="/" component={Snake} />

        <Route exact path="/2" component={Page2} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/results-firebase" component={ResultsFirebase} />
      </Switch>
    </div>
  );
}

export default App;
