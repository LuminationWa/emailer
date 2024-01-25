"use client";
import { React, useState, useEffect } from "react";

export default function Home() {
  //State related variables
  const [ogText, setOgText] = useState("");
  const [newText, setNewText] = useState("");
  const [currentModifier, setCurrentModifier] = useState("red");
  const [outputText, setOutputText] = useState("");

  //Variables
  const modifiers = [{ name: "red", regex: /\{(.*?)\}/g}];

  //Functions
  //addChanges handles to change to the selection
  //replaceText is a smaller scope function that gets called for every modifier
  //transformText is the main one, handling the whole modifiers array and passing em to replaceText. Also sets state

  const addChanges = (target, changes) => {
    let targetObject = modifiers.find((modifier) => modifier.name === target);
    if (changes.length > 0) {
      targetObject.replaceWith = changes;
    }
  };
  const replaceText = (text, modifier) => {
    //Smaller function that only makes changes on modifier level
    console.log(modifier);
    const { regex, replaceWith } = modifier;
    if (replaceWith) return text.replaceAll(regex, replaceWith);
    else return text;
  };
  const trasformText = (original, changesArray) => {
    //Applies all changes and sets state
    let copyText = original;
    let newText = changesArray.reduce((accumulator, modifier) => {
      return replaceText(accumulator, modifier);
    }, copyText);
    setOutputText(newText);
  };

  //html
  return (
    <main>
      <div className="original-div">
        <h1>Original</h1>
        <input
          type="text"
          className="original-text"
          value={ogText}
          onChange={(e) => setOgText(e.target.value)}
        />
      </div>

      <div className="customizer">
        <h1>Customize</h1>
        <h2>Content to change</h2>
        <p>Red</p>
        <input type="text" onChange={(e) => setNewText(e.target.value)}></input>
        <button
          onClick={() => {
            addChanges(currentModifier, newText);
          }}
        >
          Add changes
        </button>
        <button
          onClick={() => {
            trasformText(ogText, modifiers);
          }}
        >
          Transform text
        </button>
      </div>

      <div className="output-text">
        <h1>Output</h1>
        <p>{outputText}</p>
      </div>
    </main>
  );
}
