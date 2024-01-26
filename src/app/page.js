"use client";
import { React, useState, useEffect } from "react";

export default function Home() {
  //State related variables
  const [ogText, setOgText] = useState("");
  const [newText, setNewText] = useState("");
  const [modifiers, setModifiers] = useState([
    { name: "default", regex: /\{(.*?)\}/g },
  ]);
  const [currentModifier, setCurrentModifier] = useState("default");
  const [outputText, setOutputText] = useState("");

  //Functions
  //addChanges creates a copy of the modifiers array and makes changes to the target object properties. Updates state after.
  //replaceText is a smaller scope function that gets called for every modifier
  //transformText is the main one, handling the whole modifiers array and passing em to replaceText. Also sets state

  const addChanges = (target, changes) => {
    const newModifiers = [...modifiers];
    let targetObject = newModifiers.find(
      (modifier) => modifier.name === target
    );
    targetObject.replaceWith = changes;
    setModifiers(newModifiers);
  };
  const replaceText = (text, modifier) => {
    //Smaller function that only makes changes on modifier level
    const { regex, replaceWith } = modifier;
    if (replaceWith) {
      return text.replaceAll(regex, replaceWith);
    } else return text;
  };
  const trasformText = (original, changesArray) => {
    //Applies all changes and sets state
    let copyText = original;
    let newText = changesArray.reduce((accumulator, modifier) => {
      return replaceText(accumulator, modifier);
    }, copyText);
    setOutputText(newText);
  };

  //UseEffect

  useEffect(() => {
    //Handles output
    trasformText(ogText, modifiers);
  }, [modifiers]);

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
        <div className="modifiers-bar">
          {modifiers.map((modifier) => (
            <button key={modifier}>{modifier.name}</button>
          ))}
        </div>
        <input
          type="text"
          onChange={(e) => addChanges(currentModifier, e.target.value)}
        ></input>
      </div>

      <div className="output-text">
        <h1>Output</h1>
        <p>{outputText}</p>
      </div>
    </main>
  );
}
