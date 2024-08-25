import express from "express";
import {
  getAllRecord,
  addInventoryRecord,
} from "../controllers/AuthController/inventoryController.js";

const router = express.Router();

router.get("/", getAllRecord);

export default router;
