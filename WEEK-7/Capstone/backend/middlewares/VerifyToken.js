import jwt from "jsonwebtoken";
import { config } from "dotenv";

const { verify } = jwt;
config();

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log("Verifying token...");
      
      // Get token from cookie
      const token = req.cookies?.token;
      
      // Check if token exists
      if (!token) {
        console.warn("No token found in cookies");
        return res.status(401).json({ 
          success: false,
          message: "Authentication required. Please login first." 
        });
      }
      
      // Validate and decode the token
      let decodedToken;
      try {
        decodedToken = verify(token, process.env.SECRET_KEY);
      } catch (jwtError) {
        console.error("JWT Verification failed:", jwtError.message);
        return res.status(401).json({ 
          success: false,
          message: "Invalid or expired token. Please login again." 
        });
      }
      
      // Check if token has expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.warn("Token has expired");
        return res.status(401).json({ 
          success: false,
          message: "Session expired. Please login again." 
        });
      }
      
      // Check if user role is allowed
      if (!allowedRoles.includes(decodedToken.role)) {
        console.warn(`Unauthorized access attempt. Role: ${decodedToken.role}, Required: ${allowedRoles.join(', ')}`);
        return res.status(403).json({ 
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(', ')}` 
        });
      }
      
      // Add decoded token to request object
      req.user = decodedToken;
      console.log(`Token verified for user: ${decodedToken.email}, Role: ${decodedToken.role}`);
      
      next();
    } catch (err) {
      console.error("Unexpected error in token verification:", err);
      res.status(401).json({ 
        success: false,
        message: "Authentication failed" 
      });
    }
  };
};
