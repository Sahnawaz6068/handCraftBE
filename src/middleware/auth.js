import jwt from "jsonwebtoken";
import responsebody from "../utils/responsebody.js";

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };
    errorResponse.message = "No token provided..";

    return res.status(401).json({
      errorResponse,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Error:", err);

    return res.status(401).json({
      errorResponse: {
        message: err.message,
      },
    });
  }
}

export default auth;
