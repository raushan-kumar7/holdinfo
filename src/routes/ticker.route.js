import { Router } from "express";
import { getAllTickers, storeTickers } from "../controllers/ticker.controller.js";

const router = Router();

router.route("/get-all-tickers").get(getAllTickers);
router.route("/store-tickers").post(storeTickers);

router.route('/').get(storeTickers);

export default router;
