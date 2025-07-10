import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type StockData = {
  Date: string;
  Close: number;
  SMA20: number;
  SMA50: number;
};

interface Props {
  symbol: string;
}

export default function StockChart({ symbol }: Props) {
  const [data, setData] = useState<StockData[]>([]);
  const [signal, setSignal] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://stock-analyzer-api.azurewebsites.net/stock/${symbol}`);
        setData(res.data.data);
        setSignal(res.data.pattern_signal);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    fetchData();
  }, [symbol]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Test</h2>
      <h2 className="text-xl font-bold mb-2">{symbol.toUpperCase()}</h2>
      <p className="mb-4 text-green-700 font-semibold">Signal: {signal}</p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Close" stroke="black" dot={false} />
          <Line type="monotone" dataKey="SMA20" stroke="blue" dot={false} />
          <Line type="monotone" dataKey="SMA50" stroke="red" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
