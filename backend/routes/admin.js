import express from "express";
// import {
//   getAllDoner,
//   deleteUser,
//   deleteDoner,
//   updateDoner,
//   getSingleUDoner,
//   getAllUser,
//   updateUser,
//   getSingleUser,
// } from "../controllers/AuthController/adminController.js";

import {
  getAllDoner,
  getSingleDoner,
  updateSingleDoner,
  deleteDoner,
} from "../controllers/AuthController/donerController.js";

import {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
} from "../controllers/AuthController/patientController.js";
import {
  addInventoryRecord,
  deleteRecord,
  getSingleRecord,
  updateSingleRecord,
} from "../controllers/AuthController/inventoryController.js";
import adminMiddleware from "../auth/adminMiddleware.js";
import authenticate from "../auth/verifyToken.js";

const router = express.Router();
// admin doner route
router.get("/doner", authenticate, adminMiddleware, getAllDoner);
router.delete("/doner/delete/:id", authenticate, adminMiddleware, deleteDoner);
router.put(
  "/doner/update/:id",
  authenticate,
  adminMiddleware,
  updateSingleDoner
);
router.get("/doner/:id", authenticate, adminMiddleware, getSingleDoner);
// admin user route
router.get("/user", authenticate, adminMiddleware, getAllUser);
router.delete("/user/delete/:id", authenticate, adminMiddleware, deleteUser);
router.put("/user/update/:id", authenticate, adminMiddleware, updateSingleUser);
router.get("/user/:id", authenticate, adminMiddleware, getSingleUser);

// Blood inventory for admin
router.post("/addrecord", authenticate, adminMiddleware, addInventoryRecord);
router.put(
  "/inventory/update/:id",
  authenticate,
  adminMiddleware,
  updateSingleRecord
);
router.get("/inventory/:id", getSingleRecord);
router.delete(
  "/inventory/delete/:id",
  authenticate,
  adminMiddleware,
  deleteRecord
);

export default router;
