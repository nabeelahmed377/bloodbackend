// import Admin from "../../models/AdminSchema.js";
// import bcrypt from "bcryptjs";

// // Admin CONTROLLERS
// export const getAllAdmin = async (req, res) => {
//   try {
//     const getAllAdmin = await Admin.find().select("-password");

//     res.status(200).json({
//       status: true,
//       message: "Successfully found all Admin",
//       data: getAllAdmin,
//     });
//   } catch (error) {
//     res.status(404).json({ status: false, message: "Admins Not found" });
//   }
// };

// export const updateAdmin = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     req.body.password = hashedPassword;
//     const updateAdminData = await Admin.findByIdAndUpdate(
//       id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.status(200).json({
//       status: true,
//       message: "Successfully Update Admin",
//       data: updateAdminData,
//     });
//   } catch (error) {
//     res.status(404).json({ status: false, message: "Admins Not found", error });
//   }
// };

// export const getSingleUAdmin = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const singleAdmin = await Admin.findOne({ _id: id }).select("-password");
//     res.status(200).json({
//       status: true,
//       message: "Successfully find Admin",
//       data: singleAdmin,
//     });
//   } catch (error) {
//     res.status(404).json({ status: false, message: "Admins Not found" });
//   }
// };

// export const deleteAdmin = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Admin.findByIdAndDelete({ _id: id });
//     res
//       .status(200)
//       .json({ status: true, message: "Users Delete Successfully" });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       message: "Something went wrong while deleteing a User",
//     });
//   }
// };
