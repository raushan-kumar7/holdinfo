import mongoose, { Schema } from "mongoose";

const tickerSchema = new Schema(
  {
    baseUnit: {
      type: String,
    },
    quoteUnit: {
      type: String,
    },
    low: {
      type: Number,
    },
    high: {
      type: Number,
    },
    last: {
      type: Number,
    },
    type: {
      type: String,
    },
    open: {
      type: Number,
    },
    sell: {
      type: Number,
    },
    buy: {
      type: Number,
    },
    at: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Ticker = mongoose.model("Ticker", tickerSchema);
