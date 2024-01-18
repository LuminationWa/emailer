"use client";
import { React, useState, useEffect } from "react";

export default function Home() {
  const [ogText, setOgText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  return (
    <main>
      <div className="original-div">
        <input
          type="text"
          className="original-text"
          value={ogText}
          onChange={(e) => setOgText(e.target.value)}
        />
        <button
          onClick={() => {
            console.log(ogText);
          }}
        >
          Submit
        </button>
      </div>
      <div className="customizer">
        <button
          onClick={() => {
            setModifiedText(ogText);
          }}
        >
          Change
        </button>
      </div>
      <div className="output-text">
        <p>{modifiedText}</p>
      </div>
    </main>
  );
}
