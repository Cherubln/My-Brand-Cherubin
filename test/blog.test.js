const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/index");

chai.should();
chai.use(chaiHttp);

let token;

describe("Blog API", function () {
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

  //  test GET all blogs

  describe("GET /blogs", function () {
    it("Should get all the blogs", function (done) {
      chai
        .request(server)
        .get("/blogs")
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          done();
        });
    });
    it("Should not get all the blogs", function (done) {
      chai
        .request(server)
        .get("/blog")
        .end(function (err, res) {
          res.should.have.status(404);
          res.should.be.a("object");
          done();
        });
    });
  });

  //  test GET single blog

  describe("GET /blogs/:id", function () {
    it("Should get a blog", function (done) {
      const id = "5f3997e795c9cf1350745805";
      chai
        .request(server)
        .get("/blogs/" + id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("content");
          done();
        });
    });
    it("Should not get a blog", function (done) {
      chai
        .request(server)
        .get("/blogs/:id")
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });

  //  test POST blogs

  describe("POST /blogs", function () {
    it("Should post a blog", function (done) {
      chai
        .request(server)
        .post("/blogs/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "blog title",
          content:
            "HTML stands for hypertext markup language. Markup languages are actually very common. They're not the same as programing languages, instead they're special languages that use tags to annotate or markup documents.",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("content");
          res.body.should.have.property("_id");
          res.body.should.have.property("comments");
          res.body.should.have.property("likes");
          done();
        });
    });
    it("Should not post a blog", function (done) {
      chai
        .request(server)
        .post("/blogs/")
        .send({
          title: "blog title",
          content:
            "HTML stands for hypertext markup language. Markup languages are actually very common. They're not the same as programing languages, instead they're special languages that use tags to annotate or markup documents.",
        })
        .end(function (err, res) {
          res.should.have.status(401);

          done();
        });
    });
  });

  //  test PATCH blog

  describe("PATCH /blog/:id", function () {
    it("Should update a blog", function (done) {
      const id = "5f3997e795c9cf1350745805";
      chai
        .request(server)
        .patch("/blogs/" + id)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "blog title number 3",
          content:
            "Instead they're special languages that use tags to annotate or markup documents,HTML stands for hypertext markup language. Markup languages are actually very common. They're not the same as programing languages.",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("content");
          res.body.should.have.property("_id");
          res.body.should.have.property("comments");
          res.body.should.have.property("likes");
          done();
        });
    });

    it("Should not update a blog", function (done) {
      chai
        .request(server)
        .patch("/blogs/:id")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "blog title number 3",
          content:
            "Instead they're special languages that use tags to annotate or markup documents,HTML stands for hypertext markup language. Markup languages are actually very common. They're not the same as programing languages.",
        })
        .end(function (err, res) {
          res.should.have.status(404);

          done();
        });
    });
  });

  //  test DELETE blog

  describe("DELETE /blog:id", function () {
    it("Shoould delete a blog", function (done) {
      const id = "5f369b015fc356087c027868";
      chai
        .request(server)
        .delete("/blogs/" + id)
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message").eq("Blog deleted");
          done();
        });
    });

    it("Shoould not delete a blog", function (done) {
      chai
        .request(server)
        .delete("/blogs/:id")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("blog doesn't exist!");
          done();
        });
    });
  });
});
