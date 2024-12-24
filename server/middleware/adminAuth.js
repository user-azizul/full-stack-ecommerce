import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    // Check if authorization header is present
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in."
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only."
      });
    }

    // Optionally attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);

    // More specific error responses
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again."
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred during authorization."
    });
  }
};
