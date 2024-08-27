import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/patient.js";
import donerRoute from "./routes/doner.js";
import adminRoute from "./routes/admin.js";
import appointmentRoute from "./routes/appointment.js";
import bloodBankInventory from "./routes/bloodBankInventory.js";

dotenv.config();
const app = express();
// const port = process.env.PORT || 8000;
const port = 3000;

const corsOptions = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// add middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.options("", cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/patient", userRoute);
app.use("/api/v1/doner", donerRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/appointment", appointmentRoute);
app.use("/api/v1/inventory", bloodBankInventory);

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connect Succesfully");
  } catch (error) {
    console.log("Database failed to connect" + error);
  }
};

app.listen(port, () => {
  connectDB();
  console.log("app is running on port", port);
});
