import express from "express";
import {
  AddAppointment,
  getAppointments,
  UpdateStatus,
  deleteAppointment,
} from "../controllers/AuthController/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", AddAppointment);
router.put("/appointments/:id/status", UpdateStatus);
router.delete("/appointments/:id", deleteAppointment);

export default router;
