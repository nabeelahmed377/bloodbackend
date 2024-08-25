import express from "express";
import {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  getPatientAppointments,
} from "../controllers/AuthController/patientController.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateSingleUser);
router.delete("/:id", deleteUser);
router.get("/:id/appointments", getPatientAppointments);

export default router;
