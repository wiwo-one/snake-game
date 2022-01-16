import React, { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  startAt,
  startAfter,
} from "firebase/firestore";
import db from "../utils/Firebase";

// Get a list of results from your database
async function getResults(db) {
  const resultsCol = collection(db, "results");
  const resultsSnapshot = await getDocs(resultsCol);
  const resultsList = resultsSnapshot.docs.map((doc) => doc.data());
  resultsList.forEach((doc) => {
    console.log(`${doc.playerName} => ${doc}`);
  });
  return resultsList;
}

export default function ResultsFirebase() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [prevLastVisible, setPrevLastVisible] = useState();
  const [lastVisible, setLastVisible] = useState();

  useEffect(async () => {
    const qStart = query(collection(db, "results"), orderBy("result"), limit(5));

    const unsubscribe = onSnapshot(qStart, (querySnapshot) => {
      setResults(querySnapshot.docs.map((doc) => doc.data()));

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      //console.log(lastVisible);
      //console.log(querySnapshot.docs.length - 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let qNext = null;
    let unsubscribe = null;
    console.log(lastVisible);
    if (page > 0 && lastVisible !== undefined) {
      setPrevLastVisible(lastVisible);
      console.log(prevLastVisible);
      qNext = query(collection(db, "results"), orderBy("result"), startAfter(lastVisible), limit(5));
      unsubscribe = onSnapshot(qNext, (querySnapshot) => {
        setResults(querySnapshot.docs.map((doc) => doc.data()));
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        //console.log(querySnapshot.docs.length - 1);
      });
    }

    return () => {
      typeof unsubscribe === "function" ? unsubscribe() : console.log("NIE FUNKCJA");
    };
  }, [page]);

  const [name, setName] = useState();
  const [result, setResult] = useState(0);

  const handleSave = (ev) => {
    ev.preventDefault();
    addNewResult();
    console.log("CLICK");
  };

  const addNewResult = async () => {
    console.log("DODAJE + " + name);
    try {
      const docRef = await addDoc(collection(db, "results"), {
        playerName: name,
        result: result,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-gray-400 h-screen-js">
      <section>
        <form onSubmit={handleSave}>
          <input
            className="border-2"
            type="text"
            onChange={(ev) => {
              setName(ev.target.value);
            }}></input>
          <input
            className="border-2"
            type="number"
            onChange={(ev) => {
              setResult(Number(ev.target.value));
            }}></input>
          <button type="submit">OK</button>
        </form>
      </section>
      <section>
        <p>Wyniki</p>
        <p>😀😀😀😀</p>
        <div>
          {results &&
            results?.map((doc, index) => (
              <p key={index}>
                {doc.playerName}: {doc.result}
              </p>
            ))}
        </div>
      </section>
      <section className="pt-2">
        <a onClick={() => setPage((prev) => prev - 1)}>PREV </a>
        PAGE: {page}
        <a onClick={() => setPage((prev) => prev + 1)} ef="">
          NEXT
        </a>
      </section>
    </div>
  );
}
