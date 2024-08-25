import mongoose from "mongoose";

const BloodInventorySchema = new mongoose.Schema(
  {
    bloodbank: {
      type: String,
      required: true,
    },
    blood: [
      {
        bloodGroup: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
        available: {
          type: String,
          enum: ["available", "non-available"],
          default: "available",
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("BloodInventory", BloodInventorySchema);
