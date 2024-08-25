import jwt from "jsonwebtoken";
// import User from "../models/UserSchema.js";
// import Doctor from "../models/DoctorSchema.js";

export const authenticate = async (req, res, next) => {
  //   get token from headers
  const authToken = req.headers.authorization;

  // check token is exist or not
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
  try {
    const token = authToken.split(" ")[1];

    // verifytoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token is expires " });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", error });
  }
};
export default authenticate;
