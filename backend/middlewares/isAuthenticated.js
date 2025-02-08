import jwt from "jsonwebtoken";

// Authentication Middleware
const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // If no token is found
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the user ID to the request object for future use
    req.id = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      message: "Invalid token or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
