const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/index");

chai.should();
chai.use(chaiHttp);

describe("User API", function () {
  //   //  test login

  describe("POST /login", function () {
    it("Should login", function (done) {
      chai
        .request(server)
        .post("/login/")
        .send({
          email: "chesrb@gmail.com",
          password: "password",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("status");
          res.body.should.have.property("token");

          done();
        });
    });
    it("Should not login", function (done) {
      chai
        .request(server)
        .post("/login/")
        .send({
          email: "chesrb@gmail",
          password: "password",
        })
        .end(function (err, res) {
          res.should.have.status(401);
          done();
        });
    });
  });

  // test logout

  describe("GET /logout", function () {
    it("Should logout", function (done) {
      chai
        .request(server)
        .get("/logout")
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eq("logged out successfully");
          done();
        });
    });
    it("Should not logout", function (done) {
      chai
        .request(server)
        .get("/Log")
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
});
