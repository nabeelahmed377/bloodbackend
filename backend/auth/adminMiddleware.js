const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({
        status: false,
        message: "Access denied. User is not an admin",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default adminMiddleware;
