import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import StockChart from "./components/StockChart";
function App() {
    const [symbol, setSymbol] = useState("AAPL");
    return (_jsxs("div", { className: "max-w-4xl mx-auto mt-10 p-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "\uD83D\uDCCA Stock Pattern Analyzer" }), _jsxs("div", { className: "flex justify-center mb-6", children: [_jsx("input", { type: "text", value: symbol, onChange: (e) => setSymbol(e.target.value), className: "border border-gray-300 p-2 rounded-l", placeholder: "Enter stock symbol" }), _jsx("button", { onClick: () => setSymbol(symbol.toUpperCase()), className: "bg-blue-600 text-white px-4 rounded-r", children: "Analyze" })] }), _jsx(StockChart, { symbol: symbol })] }));
}
export default App;
