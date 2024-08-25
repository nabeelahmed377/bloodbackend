import express from "express";
import {
  getAllDoner,
  getSingleDoner,
  updateSingleDoner,
  deleteDoner,
  sendEmail,
  getDonorAppointments,
} from "../controllers/AuthController/donerController.js";

const router = express.Router();

router.get("/", getAllDoner);
router.get("/:id", getSingleDoner);
router.put("/:id", updateSingleDoner);
router.delete("/:id", deleteDoner);
router.post("/:id", sendEmail);
router.get("/:id/receivedAppointments", getDonorAppointments);

export default router;
