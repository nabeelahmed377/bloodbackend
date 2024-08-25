import Doner from "../../models/DonerSchema.js";
import Patient from "../../models/PatientSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const generateToken = (user) => {
//   return jwt.sign({ id: user._id }, process.env.SECRETE_KEY, {
//     expiresIn: "15d",
//   });
// };

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, user: user },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmpassword,
    gender,
    role,
    age,
    phone,
    bloodGroup,
    lastDonationDate,
  } = req.body;
  try {
    let user = null;

    const patient = await Patient.findOne({ email });
    const doner = await Doner.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doner) {
      user = doner;
    }

    // check if user exist or not
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hashing password for new user register
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "doner") {
      user = new Doner({
        name,
        email,
        password: hashPassword,
        confirmpassword: hashPassword,
        gender,
        role,
        age,
        phone,
        bloodGroup,
        lastDonationDate,
      });
    }

    if (role === "patient") {
      user = new Patient({
        name,
        email,
        password: hashPassword,
        confirmpassword: hashPassword,
        gender,
        role,
        age,
        phone,
        bloodGroup,
      });
    }
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User create Succesfully " });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Invalid,Try Again",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const patient = await Patient.findOne({ email });
    const doner = await Doner.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doner) {
      user = doner;
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const { password: _, role, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "login Successfully",
      data: { ...rest, role, token },
      // token,s
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Invalid,Try Again ${error}`,
    });
  }
};
