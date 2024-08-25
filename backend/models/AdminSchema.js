// import mongoose from "mongoose";

// // Define the Donor schema
// const adminSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: false,
//     unique: false,
//   },
//   phone: {
//     type: Number,
//     required: false,
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//     required: false,
//   },
//   password: {
//     type: String,
//     required: false,
//   },
//   confirmPassword: {
//     type: String,
//     required: false,
//   },
//   age: {
//     type: Number,
//     required: false,
//   },
//   bloodGroup: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "admin",
//   },
// });

// // Create and export the Donor model
// export default mongoose.model("Admin", adminSchema);
