import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";

chai.should();
chai.use(chaiHttp);

let token;
let blogId;

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
    it("Should get all the blogs with status code 200", function (done) {
      chai
        .request(server)
        .get("/blogs")
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          done();
        });
    });
    it("Should not get all the blogs on invalid resource ", function (done) {
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

  //  test POST blogs

  describe("POST /blogs", function () {
    it("Should post a blog when authorized", function (done) {
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
          blogId = res.body._id;
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
    it("Should not post a blog when unauthorized", function (done) {
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

    it("Should not post a blog when passed invalid properties", function (done) {
      chai
        .request(server)
        .post("/blogs/")
        .send({
          title: "",
          content: " documents.",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  //  test GET single blog

  describe("GET /blogs/:id", function () {
    it("Should get a blog when passed a valid id", function (done) {
      chai
        .request(server)
        .get("/blogs/" + blogId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("content");
          done();
        });
    });
    it("Should not get a blog on invalid id", function (done) {
      chai
        .request(server)
        .get("/blogs/hlakdjfos")
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });

  // test POST comment

  describe("POST /blogs/comments/:id", function () {
    it("Should post a comment on valid id", function (done) {
      chai
        .request(server)
        .post("/blogs/comments/" + blogId)
        .send({
          name: "christie",
          message: "Hope you are doing well",
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("message").eq("comment added");

          done();
        });
    });
    it("Should not post a comment on invalid id", function (done) {
      chai
        .request(server)
        .post("/blogs/comments/hlakdjfos")
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
        .post("/blogs/comments/" + blogId)
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

  // test POST likes

  describe("POST /blogs/likes/:id", function () {
    it("Should add a like when passed valid id", function (done) {
      chai
        .request(server)
        .post("/blogs/likes/" + blogId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message").eq("like added");
          done();
        });
    });
    it("Should not add like when passed invalid id", function (done) {
      chai
        .request(server)
        .post("/blogs/likes/hosidfuis")
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("Blog doesn't exist!");
          done();
        });
    });
  });

  //  test PATCH blog

  describe("PATCH /blog/:id", function () {
    it("Should update a blog when authorized", function (done) {
      chai
        .request(server)
        .patch("/blogs/" + blogId)
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

    it("Should not update a blog on invalid id", function (done) {
      chai
        .request(server)
        .patch("/blogs/ksgjk")
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

    it("Should not update a blog on unauthorized", function (done) {
      chai
        .request(server)
        .patch("/blogs/" + blogId)
        .send({
          title: "blog title number 3",
          content:
            "Instead they're special languages that use tags to annotate or markup documents,HTML stands for hypertext markup language. Markup languages are actually very common. They're not the same as programing languages.",
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");
          done();
        });
    });
  });

  //  test DELETE blog

  describe("DELETE /blog:id", function () {
    it("Shoould delete a blog when authorized", function (done) {
      chai
        .request(server)
        .delete("/blogs/" + blogId)
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property("message").eq("Blog deleted");
          done();
        });
    });

    it("Shoould not delete a blog on invalid id", function (done) {
      chai
        .request(server)
        .delete("/blogs/mdig")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property("error").eq("blog doesn't exist!");
          done();
        });
    });

    it("Shoould not delete a blog on unthorized", function (done) {
      chai
        .request(server)
        .delete("/blogs/" + blogId)
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have.property("message").eq("Unauthorized");
          done();
        });
    });
  });
});
