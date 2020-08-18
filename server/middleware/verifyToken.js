const verifyToken = (req, res, next) => {
  const bearerHead = req.headers["authorization"];
  if (typeof bearerHead !== "undefined") {
    const bearer = bearerHead.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized" });
  }
};

module.exports = verifyToken;
