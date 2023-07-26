import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the CSS file

const App = () => {
  const [stock, setStock] = useState("");
  const [date, setDate] = useState("");
  const [tradeStatistics, setTradeStatistics] = useState(null);
  console.log("first", stock, date);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/trade-statistics/${stock}/${date}`
      );
      setTradeStatistics(response.data);
    } catch (error) {
      console.error("Error fetching trade statistics:", error.message);
    }
  };

  return (
    <div>
      <h1>Stock Trade Statistics</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label htmlFor="stock">Stock Symbol:</label>
          <input
            type="text"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <label htmlFor="date">Date (YYYY-MM-DD):</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit">Get Trade Statistics</button>
        </div>
      </form>

      {tradeStatistics && (
        <div>
          <h2>
            Trade Statistics for {stock} on {date}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tradeStatistics.open}</td>
                <td>{tradeStatistics.high}</td>
                <td>{tradeStatistics.low}</td>
                <td>{tradeStatistics.close}</td>
                <td>{tradeStatistics.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
