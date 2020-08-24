import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";

chai.should();
chai.use(chaiHttp);

let token;
let queryId;

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
          queryId = res.body._id;
          res.should.have.status(200);
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.have.property("_id");
          res.body.should.have.property("message");
          done();
        });
    });
    it("Should not post a query on invalid resource", function (done) {
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
      chai
        .request(server)
        .get("/queries/" + queryId)
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
        .get("/queries/hlakdjfoi")
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
        .get("/queries/hlakdjfoi")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");

          done();
        });
    });
  });

  //   //  test DELETE query

  describe("DELETE /query:id", function () {
    it("Shoould delete a query when authorized", function (done) {
      chai
        .request(server)
        .delete("/queries/" + queryId)
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
        .delete("/queries/hlakdjfoi")
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
        .delete("/queries/hlakdjfoi")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");
          done();
        });
    });
  });
});
