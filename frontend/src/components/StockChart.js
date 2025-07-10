import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
export default function StockChart({ symbol }) {
    const [data, setData] = useState([]);
    const [signal, setSignal] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`https://stock-analyzer-api.azurewebsites.net/stock/${symbol}`);
                setData(res.data.data);
                setSignal(res.data.pattern_signal);
            }
            catch (error) {
                console.error("Error fetching stock data:", error);
            }
        }
        fetchData();
    }, [symbol]);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: symbol.toUpperCase() }), _jsxs("p", { className: "mb-4 text-green-700 font-semibold", children: ["Signal: ", signal] }), _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(LineChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "Date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "Close", stroke: "black", dot: false }), _jsx(Line, { type: "monotone", dataKey: "SMA20", stroke: "blue", dot: false }), _jsx(Line, { type: "monotone", dataKey: "SMA50", stroke: "red", dot: false })] }) })] }));
}
