import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("========== AUTH MIDDLEWARE ==========");
    console.log("AUTH HEADER =>", req.headers.authorization);
    console.log("JWT SECRET =>", process.env.JWT_SECRET);

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN =>", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED USER =>", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR =>", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;