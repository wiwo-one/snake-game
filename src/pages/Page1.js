import React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import sentences from "../data/sentences.json";

const Page1 = () => {
  const [phrase, setPhrase] = useState("I am not a Software Developer");

  const counter = useRef(0);

  const onInterval = () => {
    if (counter.current < 5) {
      counter.current = counter.current + 1;
      setPhrase(sentences[counter.current].sentence);
    }
  };

  useEffect(() => {
    window.setPhrase = setPhrase;
    const unmount = setInterval(onInterval, 5000);

    return () => {
      //unmount();
    };
  }, []);
  return (
    <div className="flex justify-center items-center bg-green-300 h-screen-js flex-col">
      <h1 className="text-6xl font-display font-bold">
        <Slideshow phrase={phrase} />
      </h1>

      {/* <p className="font-body text-xl font-light pt-16">
      Earum cupiditate dignissimos aperiam deleniti amet, vero voluptatem sit illum culpa, corporis quasi.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam sunt non officiis similique ratione
      excepturi tempora aliquid quis deserunt aperiam voluptate, quam ea? Laboriosam animi veniam alias
      voluptas quos doloremque.
    </p> */}
    </div>
  );
};

export default Page1;

export const Slideshow = ({ phrase }) => (
  <AnimatePresence exitBeforeEnter>
    <motion.p
      key={phrase}
      initial={{ opacity: 0, y: "100px" }}
      animate={{
        opacity: 1,
        y: "0px",
      }}
      exit={{
        opacity: 0,
        y: "-100px",
      }}
      transition={{
        // stiffness: 100,
        type: "spring",
        // stiffness: 45,
        duration: 1,
        bounceDamping: 8,
      }}>
      {phrase}
    </motion.p>
  </AnimatePresence>
);
