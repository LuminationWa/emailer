"use client";
import { React, useState, useEffect } from "react";

export default function Home() {
  //State related variables
  const [ogText, setOgText] = useState("");
  const [newText, setNewText] = useState("");
  const [modifiers, setModifiers] = useState([
    { name: "default", regex: /\{(.*?)\}/g, pattern: `{ }` },
  ]);
  const [currentModifier, setCurrentModifier] = useState("default");
  const [outputText, setOutputText] = useState("");

  //Functions
  //crateModifier is a factory functior modifiers
  //pushModifier simply pushes that new modifier to state
  //addChanges creates a copy of the modifiers array and makes changes to the target object properties. Updates state after.
  //replaceText is a smaller scope function that gets called for every modifier
  //transformText is the main one, handling the whole modifiers array and passing em to replaceText. Also sets state

  const createModifier = (name, regex, pattern) => {
    return { name, regex, pattern };
  };
  const pushModifier = (name, regex, pattern) => {
    //Should check for no duplicates
    const newModifiers = [...modifiers];
    const newMod = createModifier(name, regex, pattern);
    newModifiers.push(newMod);
    setModifiers(newModifiers);
    console.log(modifiers);
  };
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
        <button
          onClick={() => {
            pushModifier("texter", /\/(.*?)\//g);
          }}
        >
          +
        </button>
      </div>

      <div className="modifier-creation">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const regexValue = document.getElementById("regex").value;
            const regexSplit = regexValue.split(" ");
            const regex = new RegExp(`${regexSplit[0]}(.*?)${regexSplit[1]}`, "g");
            pushModifier(name, regex, regexValue);
            console.log(modifiers);
          }}
        >
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required />
          <label htmlFor="regex">Pattern(separated by space):</label>
          <input type="text" name="regex" id="regex" required />
          <button>Create</button>
        </form>
      </div>

      <div className="customizer">
        <h1>Customize</h1>
        <div className="modifiers-bar">
          {modifiers.map((modifier) => (
            <button
              key={modifier.name}
              onClick={() => {
                setCurrentModifier(modifier.name);
              }}
            >
              {modifier.name}
              {modifier.pattern}
            </button>
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
