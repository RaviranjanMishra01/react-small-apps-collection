function HandleCurency({ currencies = [], title, value, onChange }) {
  return (
    <div className="currency-box">
      <label className="title">{title} :</label>

      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HandleCurency;
