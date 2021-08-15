import "./App.css";
import { useEffect, useRef, useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Snake from "./pages/Snake";
import Page2 from "./pages/Page2";
import Results from "./pages/Results";

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
      <div className="absolute flex items-center justify-around w-full h-10 bg-pink-600">
        <a href="#/" onClick={() => history.push("/")}>
          Snake
        </a>
        <a href="#/" onClick={() => history.push("/2")}>
          Page2
        </a>
        <a href="#/" onClick={() => history.push("/results")}>
          Results
        </a>
      </div>

      <Switch>
        <Route exact path="/">
          <Snake />
        </Route>
        <Route exact path="/2" component={Page2} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </div>
  );
}

export default App;
