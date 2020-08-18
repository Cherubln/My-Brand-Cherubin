const verifyToken = (req, res, next) => {
  const bearerHead = req.headers["authorization"];
  if (typeof bearerHead !== "undefined") {
    const bearer = bearerHead.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
