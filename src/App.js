import "./App.css";
import { useEffect, useRef, useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Page2 from "./pages/Page2";
import Snake from "./pages/Snake";

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
      <div className="w-full h-16 bg-pink-600 flex justify-around items-center">
        <a href="#/" onClick={() => history.push("/")}>
          Snake
        </a>
        <a href="#/" onClick={() => history.push("/2")}>
          Page2
        </a>
      </div>

      <Switch>
        <Route exact path="/">
          <Snake />
        </Route>
        <Route exact path="/2" component={Page2} />
      </Switch>
    </div>
  );
}

export default App;
