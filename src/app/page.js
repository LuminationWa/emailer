"use client";
import { React, useState, useEffect } from "react";

export default function Home() {
  //State related variables
  const [ogText, setOgText] = useState("");
  const [newText, setNewText] = useState("");
  const [currentModifier, setCurrentModifier] = useState("red");
  const [currentSelection, setCurrentSelection] = useState("aaaaa");
  const [outputText, setOutputText] = useState("");

  //Variables
  const modifiers = [{ name: "red", selected: [], replaceWith: `` }];

  //Functions
  const addSelection = (target, selection) => {
    //Finds the modifier from the array and if the selection is not empty pushes it to the "selected" property
    let targetObject = modifiers.find((modifier) => modifier.name === target);
    if (selection.length > 0) {
      targetObject.selected.push(selection);
    }
  };
  const addChanges = (target, changes) => {
    let targetObject = modifiers.find((modifier) => modifier.name === target);
    if (changes.length > 0) {
      targetObject.replaceWith = changes;
    }
  };
  const replaceText = (text, modifier) => {
    //Smaller function that only makes changes on modifier level
    let modifiedText = modifier.selected.reduce((acc, toReplace, index) => {
      return acc.replace(toReplace, modifier.replaceWith);
    }, text);
    console.log(modifiedText);
    return modifiedText;
  };
  const trasformText = (original, changesArray) => {
    //Applies all changes
    let copyText = original;
    changesArray.forEach((modifier) => {
      replaceText(copyText, modifier);
    });
    return;
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
          onMouseUp={() => {
            let selection = window.getSelection().toString();
            if (selection.length > 0) setCurrentSelection(selection);
          }}
        />
        <button
          onClick={() => {
            console.log(ogText);
          }}
        >
          Save text
        </button>
        <div className="change-btns">
          <button>Add all occurences</button>
          or
          <button
            onClick={(e) => {
              addSelection(currentModifier, currentSelection);
            }}
          >
            Add selection
          </button>
        </div>
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
