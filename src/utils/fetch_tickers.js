import axios from "axios";
import { Ticker } from "../models/ticker.model.js";
import moment from "moment-timezone";

export const fetchAndStoreTickers = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const resultData = response.data;
    const result = Object.values(resultData).slice(0, 10);

    const tickerArray = result.map((data) => ({
      baseUnit: data.base_unit,
      quoteUnit: data.quote_unit,
      low: data.low,
      high: data.high,
      last: data.last,
      type: data.type,
      open: data.open,
      sell: data.sell,
      buy: data.buy,
      at: data.at,
      volume: data.volume,
      name: data.name,
    }));

    await Ticker.insertMany(tickerArray);

    let storedData = await Ticker.find().sort({ _id: -1 }).limit(10);

    const processedData = storedData.map((data) => {
      const { baseUnit, name, buy, sell, volume, open, low, high, last, at } = data;
      const timestamp = moment.utc(at * 1000);
      const tradeTime = timestamp.tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A');

      return {
        baseUnit: baseUnit ? baseUnit.toUpperCase() : '',
        name: name || '',
        buy: buy || 0,
        sell: sell || 0,
        volume: volume || 0,
        open: open || 0,
        low: low || 0,
        high: high || 0,
        last: last || 0,
        tradeTime: tradeTime,
      };
    });

    await Ticker.deleteMany({});

    return {
      success: true,
      message: "Tickers data fetched and stored successfully.",
      processedData
    };
  } catch (err) {
    throw new Error(`ERROR :: Failed to fetch and store tickers. Details: ${err.message}`);
  }
};
