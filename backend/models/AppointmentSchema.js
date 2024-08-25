import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doner",
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
export default mongoose.model("Appointment", AppointmentSchema);
