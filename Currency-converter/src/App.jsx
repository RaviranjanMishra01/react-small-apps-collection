import { useEffect, useState } from "react";
import "./App.css";
import HandleCurency from "./assets/HandleCurency";
import arrow from "./assets/arrow.svg";

function App() {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch currency list
  useEffect(() => {
    fetch("https://api.frankfurter.app/latest")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies([data.base, ...Object.keys(data.rates)]);
      });
  }, []);

  // Convert currency
  const convertCurrency = async () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setResult(data.rates[toCurrency]);
    } catch (err) {
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="main">
      <h2>Currency Converter</h2>

      <div className="handleCurrencys">
        <HandleCurency
          currencies={currencies}
          title="From"
          value={fromCurrency}
          onChange={setFromCurrency}
        />

        <img className="arrow" src={arrow} alt="swap" onClick={swapCurrency} />

        <HandleCurency
          currencies={currencies}
          title="To"
          value={toCurrency}
          onChange={setToCurrency}
        />
      </div>

      <input
        className="inputvalue"
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <button className="btn" onClick={convertCurrency} disabled={loading}>
        {loading ? "Converting..." : "Convert"}
      </button>

      {result && (
        <p className="result">
          {amount} {fromCurrency} = <strong>{result}</strong> {toCurrency}
        </p>
      )}
    </div>
  );
}

export default App;
