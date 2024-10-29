import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, Try again" });
    }

    const { isAdmin } = await jwt.verify(token, process.env.JWT_SECRET);

    if (!isAdmin) {
      return res.json({ success: false, message: "Not Authorized, Try again" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
