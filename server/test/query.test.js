const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

let token;

describe("Queries API", function () {
  before((done) => {
    chai
      .request(server)
      .post("/login")
      .send({
        email: "chesrb@gmail.com",
        password: "password",
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });

  //  test GET all queries

  describe("GET /queries", function () {
    it("Should get all the queries when authorized", function (done) {
      chai
        .request(server)
        .get("/queries")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          done();
        });
    });
    it("Should not get all the queries when unauthorized", function (done) {
      chai
        .request(server)
        .get("/queries")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");
          done();
        });
    });
  });

  //   //  test GET single query

  describe("GET /queries/:id", function () {
    it("Should get a query when authorized", function (done) {
      const id = "5f3357ad97f91a0d68c51462";
      chai
        .request(server)
        .get("/queries/" + id)
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.have.property("message");
          done();
        });
    });
    it("Should not get a query on invalid id", function (done) {
      chai
        .request(server)
        .get("/queries/:id")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("Query doesn't exist!");

          done();
        });
    });

    it("Should not get a query on unauthorized", function (done) {
      chai
        .request(server)
        .get("/queries/:id")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");

          done();
        });
    });
  });

  //   //  test POST queries

  describe("POST /queries", function () {
    it("Should post a query on valid id", function (done) {
      chai
        .request(server)
        .post("/queries/")
        .send({
          name: "christie",
          email: "chris@gmail.com",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.have.property("_id");
          res.body.should.have.property("message");
          done();
        });
    });
    it("Should not post a query on invalid id", function (done) {
      chai
        .request(server)
        .post("/query/")
        .send({
          name: "christie",
          email: "chris@gmail.com",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });

    it("Should not post a query on invalid properties", function (done) {
      chai
        .request(server)
        .post("/queries/")
        .send({
          name: "c",
          email: "chris@gmai",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  //   //  test DELETE query

  describe("DELETE /query:id", function () {
    it("Shoould delete a query when authorized", function (done) {
      const id = "5f33c8d09211f52a18182d3b";
      chai
        .request(server)
        .delete("/queries/" + id)
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message").eq("Query deleted");
          done();
        });
    });

    it("Should not delete a query on invalid id", function (done) {
      chai
        .request(server)
        .delete("/queries/:id")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("Query doesn't exist!");
          done();
        });
    });

    it("Should not delete a query on unauthorized", function (done) {
      chai
        .request(server)
        .delete("/queries/:id")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");
          done();
        });
    });
  });
});
