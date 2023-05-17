"use client";

import styles from "./page.module.css";

import Reveal from "reveal.js";
import React from "react";

// import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";

export default function Home() {
  React.useLayoutEffect(() => {
    Reveal.initialize();

    let deck = new Reveal({
      width: 400,
    });
    deck.initialize();
  }, []);

  return (
    <main>
      <RevealMain>
        <div className="slides">
          <section data-background-color="aquamarine">
            <h1>Hey</h1>
          </section>
          <section>Slide 2</section>
        </div>
      </RevealMain>
    </main>
  );
}

import { useRef, useEffect, useCallback, useState } from "react";
import { createContext } from "react";

const RevealContext = createContext(null);

let deck: any = false;

function RevealMain({ children }: any) {
  const revealRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [initialIndices, setInitialIndices] = useState({});

  const getDeck = useCallback(() => deck, []);
  const isReady = useCallback(() => !!(ready && deck), [ready]);

  const getInitialIndices = useCallback(() => {
    return initialIndices;
  }, [initialIndices]);

  useEffect(() => {
    if (!deck && revealRef.current) {
      deck = new Reveal(revealRef.current);
      deck
        .initialize({
          controls: false,
          progress: true,
          history: true,
          center: true,
          transition: "slide",
        })
        .then((e) => {
          setInitialIndices({
            currentSlide: e.currentSlide,
            indexh: e.indexh,
            indexv: e.indexv,
          });
          setReady(true);
        });
    }
  }, []);

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "100%",
      }}
    >
      <RevealContext.Provider value={{ getDeck, isReady, getInitialIndices }}>
        {children}
      </RevealContext.Provider>
    </div>
  );
}
