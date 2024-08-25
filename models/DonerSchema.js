import mongoose from "mongoose";

// Define the Donor schema
const donorSchema = new mongoose.Schema({
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
    required: true,
  },
  lastDonationDate: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["patient", "doner"],
    default: "doner",
  },
  // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  receivedAppointments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  ],
});

// Create and export the Donor model
export default mongoose.model("Doner", donorSchema);
