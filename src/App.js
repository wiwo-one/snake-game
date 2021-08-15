import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
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
    <div className="flex justify-center items-center bg-green-300 h-screen-js">
      <h1 className="text-9xl grid ">Cześć 🖐️</h1>
    </div>
  );
}

export default App;
