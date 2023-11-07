const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = isAuthenticated = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token === null) {
    res.status(401).send("No access token");
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const payload = JSON.parse(atob(base64));
  console.log(payload);
  if (payload.role !== "OWNER") {
    res.status(403).send("access denied");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        next();
      }
      if (err) {
        console.log(err);
        res.status(401).send(err);
      }
    });
  }
};
