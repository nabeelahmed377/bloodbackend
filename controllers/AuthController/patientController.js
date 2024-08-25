import User from "../../models/PatientSchema.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json({
      status: true,
      message: "Successfully found all User",
      data: getAllUser,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Users Not found" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleUser = await User.findById(id);
    res.status(200).json({
      status: true,
      message: "User found Successfully",
      data: getSingleUser,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "User Not found" });
  }
};

export const updateSingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updateSingleUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "User update Successfully",
      data: updateSingleUser,
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "User Not update", error: error });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User delete Successfully",
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "User Not delete" });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const id = req.params.id;
    // const patient = await User.findById(id).populate("appointments");
    const patient = await User.findById(id).populate({
      path: "appointments",
      populate: {
        path: "donorId",
        model: "Doner",
      },
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json({ data: patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
