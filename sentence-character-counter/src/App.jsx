import { useState } from "react";
import "./App.css";

function App() {
  const [text, settext] = useState("");
  const [character, setcharacter] = useState(0);
  const [Sentence, setsentence] = useState(0);

  function handletext(e) {
    const input = e.target.value;
    settext(input);

    // character count
    setcharacter(input.replace(/\s+/g, "").length);

    // sentence count
    const sentences = input
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setsentence(sentences.length);
  }

  return (
    <>
      <div className="main">
        <div className="left">
          <textarea
            className="text"
            value={text}
            onChange={handletext}
            name=""
            placeholder="Type or paste your text here ..."
            id=""
          ></textarea>
          <button
            onClick={() => {
              settext(""), setcharacter(0),setsentence(0);
            }}
          >
            Delete
          </button>
        </div>
        <div className="right">
          <h2>Result</h2>
          <div className="result">
            <p>chereacters : {character} </p>
            <p>Sentence : {Sentence}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
