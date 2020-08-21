const verifyToken = (req, res, done) => {
  const bearerHead = req.headers["authorization"];
  if (typeof bearerHead !== "undefined") {
    const bearer = bearerHead.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  done();
};

export default verifyToken;
