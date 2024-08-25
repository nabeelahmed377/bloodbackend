import mongoose from "mongoose";

// Define the patient schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: false,
  },
  role: {
    type: String,
    enum: ["patient", "doner"],
    default: "patient",
  },
  password: {
    type: String,
    required: false,
  },
  confirmPassword: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  reqbloodGroup: { type: String, required: false }, // New field
  amountBlood: { type: String, required: false }, // New field
  hospitalName: { type: String, required: false }, // New field
});

// Create and export the patinet model
export default mongoose.model("patient", patientSchema);
