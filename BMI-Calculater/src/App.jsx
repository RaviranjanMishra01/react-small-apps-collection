import { useState } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState(""); // in cm
  const [weight, setWeight] = useState(""); // in kg
  const [bmi, setBmi] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    const hInMeters = Number(height) / 100;
    const w = Number(weight);

    if (!hInMeters || !w) {
      alert("Please enter valid height & weight.");
      return;
    }

    const bmiValue = (w / (hInMeters * hInMeters)).toFixed(2);
    setBmi(bmiValue);
  };

  return (
    <>
      <div className="main">
        <h3>BMI calculater</h3>
        <form onSubmit={submitForm} className="form">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />

          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />

          <div className="buttons">
            <button type="submit" className="submit">Submit</button>
            <button className="reset"
              type="reset"
              onClick={() => {
                setHeight("");
                setWeight("");
                setBmi(null);
              }}
            >
              Reset
            </button>
          </div>
          {bmi && <h3 className="ans">Your BMI: {bmi}</h3>}
        </form>
      </div>
    </>
  );
}

export default App;
