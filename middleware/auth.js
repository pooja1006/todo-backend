const jwt = require("jsonwebtoken"); // ✅ Import
require("dotenv").config(); // ✅ To load env vars

function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET); // ✅ Use from env

    req.user = { id: decoded.userId }; // ✅ This will now have a value
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
