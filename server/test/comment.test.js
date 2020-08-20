const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Comments API", function () {
  describe("POST /blogs/comments/:id", function () {
    it("Should post a comment on valid id", function (done) {
      const id = "5f3997e795c9cf1350745805";
      chai
        .request(server)
        .post("/blogs/comments/" + id)
        .send({
          name: "christie",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          //   res.body.should.have.property("name");
          res.body.should.have.property("message");
          res.body.should.have.property("message").eq("comment added");

          done();
        });
    });
    it("Should not post a comment on invalid id", function (done) {
      chai
        .request(server)
        .post("/blogs/comments/:id")
        .send({
          name: "christie",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("Blog doesn't exist!");
          done();
        });
    });

    it("Should not post a comment on invalid properties", function (done) {
      chai
        .request(server)
        .post("/blogs/comments/:id")
        .send({
          name: " ",
          message: "Hope ",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("error");
          done();
        });
    });
  });
});
