import { fetchAndStoreTickers } from "../utils/fetch_tickers.js";
import { Ticker } from "../models/ticker.model.js";

const storeTickers = async (req, res) => {
  try {
    const result = await fetchAndStoreTickers();
    res.render('index', { data: result.processedData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllTickers = async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.status(200).json({ success: true, message: "All Tickers found", tickers });
  } catch (err) {
    res.status(500).json({ success: false, message: "ERROR :: Tickers not found" });
  }
};

export { storeTickers, getAllTickers };
