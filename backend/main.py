from fastapi import FastAPI, HTTPException
import yfinance as yf
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS (allow all origins for now — restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stock/{symbol}")
async def get_stock_data(symbol: str, period: str = "3mo", interval: str = "1d"):
    """
    Fetch stock data and detect SMA20/SMA50 crossover patterns.
    """
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period, interval=interval)

        if df.empty:
            raise HTTPException(status_code=404, detail="No data found")

        df = df.reset_index()

        # Calculate simple moving averages
        df["SMA20"] = df["Close"].rolling(window=20).mean()
        df["SMA50"] = df["Close"].rolling(window=50).mean()

        # Detect crossover pattern
        signal = "No crossover"
        if len(df) >= 51:
            prev = df.iloc[-2]
            curr = df.iloc[-1]

            if prev["SMA20"] < prev["SMA50"] and curr["SMA20"] >= curr["SMA50"]:
                signal = "Bullish crossover"
            elif prev["SMA20"] > prev["SMA50"] and curr["SMA20"] <= curr["SMA50"]:
                signal = "Bearish crossover"

        # Clean NaN rows before converting to JSON
        df_clean = df[["Date", "Open", "High", "Low", "Close", "Volume", "SMA20", "SMA50"]].dropna()

        return {
            "symbol": symbol.upper(),
            "pattern_signal": signal,
            "data": df_clean.to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
