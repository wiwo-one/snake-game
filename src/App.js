import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Tech from "./pages/Tech";
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
          Home
        </a>
        <a href="#/" onClick={() => history.push("/1")}>
          Page1
        </a>
        <a href="#/" onClick={() => history.push("/2")}>
          Page2
        </a>
        <a href="#/" onClick={() => history.push("/tech-for-better")}>
          Tech for Better
        </a>
        <a href="#/" onClick={() => history.push("/snake")}>
          Snake
        </a>
      </div>

      <Switch>
        <Route exact path="/1" component={Page1} />
        <Route exact path="/2" component={Page2} />
        <Route exact path="/tech-for-better">
          <Tech />
        </Route>
        <Route exact path="/snake">
          <Snake />
        </Route>

        <Route
          exact
          path="/:componentName"
          render={(props) => {
            const name = props.match.params.componentName;

            return <>{`<${name} />`}</>;
          }}
        />
        <Route
          exact
          path="/p/:num"
          render={(routeProps) => <h1 className="text-9xl">{routeProps.match.params.num}</h1>}
        />
      </Switch>
    </div>
  );
}

export default App;
