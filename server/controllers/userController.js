import jwt from "jsonwebtoken";

exports.logIn = (req, res) => {
  jwt.sign(
    {
      data: req.body,
    },
    "secretKey",
    (error, token) => {
      res.send({
        status: 200,
        token,
      });
    }
  );
};

exports.logOut = (req, res) => {
  req.logout();
  res.send({ status: 200, message: "logged out successfully" });
};
