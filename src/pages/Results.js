import React, { useCallback, useEffect, useState } from "react";
import useFetch, { Provider } from "use-http";

const Results = () => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(null);
  const [results, setResults] = useState([]);
  const { get, post, response, loading, error } = useFetch("http://localhost:4000", { data: [] });

  const loadInitialResults = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialResults = await get("/result?sort=dsc");
    console.log("RESPONSE: " + response);
    console.dir(response);
    if (response.ok) setResults(initialResults);
  }, [get, response]);

  useEffect(() => {
    loadInitialResults();
    setPoints((Math.random() * 20).toFixed(0));
  }, []); // componentDidMount

  const handleSave = (ev) => {
    ev.preventDefault();
    addNewResult();
    console.log("CLICK");
  };

  const addNewResult = useCallback(async () => {
    if (!name) return;

    const newResult = await post("/result", {
      name,
      points: points,
      finishTime: new Date(),
    });
    if (response.ok) {
      setName("");
      setResults((results) => [newResult, ...results]);
    }
  }, [post, response, name]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <h1>You got: {points}</h1>
      <form onSubmit={handleSave}>
        <input
          className="border-2"
          type="text"
          onChange={(ev) => {
            setName(ev.target.value);
          }}></input>
        <button type="submit">OK</button>
      </form>
      Imie: {name}
      <div className="flex flex-col mt-10">
        {results.map((r) => {
          return (
            <div key={r._id}>
              {r.name} - punkty: {r.points}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
