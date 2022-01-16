import React, { useEffect, useRef, useState } from "react";

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
  Timestamp,
  endAt,
  endBefore,
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
  const [prevPage, setPrevPage] = useState(-1);
  const prevLastVisible = useRef();
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();

  useEffect(async () => {
    const qStart = query(collection(db, "results"), orderBy("result"), limit(5));
    const unsubscribe = onSnapshot(qStart, (querySnapshot) => {
      setResults(querySnapshot.docs.map((doc) => doc.data()));
      setFirstVisible(querySnapshot.docs[0]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    let qNext = null;
    console.log(lastVisible);
    if (prevPage < page) {
      prevLastVisible.current = lastVisible;
      if (page > 0 && lastVisible !== undefined) {
        qNext = query(collection(db, "results"), orderBy("result"), startAfter(lastVisible), limit(5));
        unsubscribe = onSnapshot(qNext, (querySnapshot) => {
          setResults(querySnapshot.docs.map((doc) => doc.data()));
          setFirstVisible(querySnapshot.docs[0]);
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      }
    } else {
      console.log(firstVisible.data());
      const qNext2 = query(collection(db, "results"), orderBy("result"), endAt(firstVisible), limit(5));
      unsubscribe = onSnapshot(qNext2, (querySnapshot2) => {
        setResults(
          querySnapshot2.docs.map((doc) => {
            console.log(doc.data());
            return doc.data();
          })
        );
        setFirstVisible(querySnapshot2.docs[0]);
        setLastVisible(querySnapshot2.docs[querySnapshot2.docs.length - 1]);
        //console.log(prevLastVisible.current);
        //console.log(querySnapshot.docs.length - 1);
      });
    }

    //setPrevPage(page);

    return () => {
      typeof unsubscribe === "function" ? unsubscribe() : console.log("NIE FUNKCJA");
    };
  }, [page]);

  const handlePrevClick = () => {
    if (page <= 0) return;
    setPrevPage(page);
    setPage((prev) => prev - 1);
  };
  const handleNextClick = () => {
    setPrevPage(page);
    setPage((prev) => prev + 1);
  };

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
        saveTime: Timestamp.now(),
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
        <a onClick={handlePrevClick}>PREV </a>
        PAGE: {page}
        <a onClick={handleNextClick}>NEXT</a>
      </section>
      <section>PREV PAGE: {prevPage}</section>
    </div>
  );
}
