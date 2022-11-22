const authorize = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // verify token
    // firebase authorize
    const verified = true; // await verifyToken(token);
    const splitToken = token.split(".")[1];
    const decodedToken = Buffer.from(splitToken, "base64").toString("ascii");
    const body = JSON.parse(decodedToken);
    const userId = body.user_id;
    const role = body.role;
    if (verified) {
      res.locals.userId = userId;
      res.locals.role = role;
      return next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};
module.exports = authorize;
