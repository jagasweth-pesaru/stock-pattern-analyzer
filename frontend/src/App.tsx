import { useState } from "react";
import StockChart from "./components/StockChart";

function App() {
  const [symbol, setSymbol] = useState("AAPL");

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Stock Pattern Analyzer</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border border-gray-300 p-2 rounded-l"
          placeholder="Enter stock symbol"
        />
        <button
          onClick={() => setSymbol(symbol.toUpperCase())}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Analyze
        </button>
      </div>

      <StockChart symbol={symbol} />
    </div>
  );
}

export default App;
