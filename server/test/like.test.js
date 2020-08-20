const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Likes API", function () {
  describe("POST /blogs/likes/:id", function () {
    it("Should add a like when passed valid id", function (done) {
      const id = "5f3997e795c9cf1350745805";
      chai
        .request(server)
        .post("/blogs/likes/" + id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message").eq("like added");
          done();
        });
    });
    it("Should not add like when passed invalid id", function (done) {
      chai
        .request(server)
        .post("/blogs/likes/:id")
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("Blog doesn't exist!");
          done();
        });
    });
  });
});
