// auth middleware

const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // attach the user to the job routes
  req.user = { _id: payload._id, name: payload.name };
  next();
};

module.exports = checkAuth;
