import { setupMocha } from "../setup"

import chai from "chai"
const should = chai.should()

import request from "supertest"

import mappings from '../../../src/backend/mappings'

import app      from "../../../src/backend/app.js"

const Project   = mappings.mongoCon.getModel('Project')
const Milestone = mappings.mongoCon.getModel('Milestone')
const Epic      = mappings.mongoCon.getModel('Epic')


app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})

describe("routes", () => {

  setupMocha()

  const mockData = {}

  beforeEach("Add mockdata to mockgoose", async() => {

    mockData.projectOne   = await new Project({ name: "projectOne"}).save()
    mockData.milestoneOne = await new Milestone({ name: "milestoneOne",   project: mockData.projectOne}).save()
    mockData.milestoneTwo = await new Milestone({ name: "milestoneTwo",   project: mockData.projectOne}).save()
    mockData.projectOne.milestones.push(mockData.milestoneOne)
    mockData.projectOne.milestones.push(mockData.milestoneTwo)
    await mockData.projectOne.save()

    mockData.projectTwo     = await new Project({ name: "projectTwo"}).save()
    mockData.milestoneThree = await new Milestone({ name: "milestoneThree", project: mockData.projectTwo}).save()
    mockData.milestoneFour  = await new Milestone({ name: "milestoneFour",  project: mockData.projectTwo}).save()

    mockData.projectTwo.milestones.push(mockData.milestoneThree)
    mockData.projectTwo.milestones.push(mockData.milestoneFour)
    await mockData.projectTwo.save()



    // mockData.comment1 = await new Comment({ body: "Comment #1 on Post #1", author: "Claudio", post: mockData.post1 }).save()
    // mockData.comment2 = await new Comment({ body: "Comment #2 on Post #1", author: "Javier", post: mockData.post1 }).save()
    //
    // mockData.post1.comments.push(mockData.comment1)
    // mockData.post1.comments.push(mockData.comment2)
    // mockData.post1 = await mockData.post1.save()
  })

  describe("GET /project", () => {

    it("Should return the two exiting projects", async() => {
      const response = await request(app)
            .get("/project")
            .expect(200)
      response.body.should.have.lengthOf(2)
    })

    it("All posts should have their properties populated", async() => {
      // const response = await request(app)
      //       .get("/noticias")
      //       .expect(200)
      //
      // response.body[0].should.have.property("_id")
      // response.body[0].should.have.property("title", "Post #1")
      // response.body[0].should.have.property("content", "Post #1 content")
      // response.body[0].should.have.property("upvotes", 3)
      // response.body[0].should.have.property("comments").with.lengthOf(2)
      //
      // response.body[1].should.have.property("_id")
      // response.body[1].should.have.property("title", "Post #2")
      // response.body[1].should.have.property("content", "Post #2 content")
      // response.body[1].should.have.property("upvotes", 0)
      // response.body[1].should.have.property("comments").with.lengthOf(0)
    })

    it("Milestones should be sent as ids only", async() => {
      const response = await request(app)
            .get("/project")
            .expect(200)
      response.body[0].should.have.property("milestones").with.lengthOf(2)
      response.body[0].milestones[0].should.be.a("string")
      response.body[0].milestones[1].should.be.a("string")
    })

  })

  describe("GET /noticias/:noticia", () => {

    context("When querying an existing id", () => {
      it("Should return the exiting object", async() => {
        // const response = await request(app)
        //       .get("/noticias/" + mockData.post1._id)
        //       .expect(200)
        //
        // response.body.should.have.property("_id")
        // response.body.should.have.property("title", "Post #1")
        // response.body.should.have.property("content", "Post #1 content")
        // response.body.should.have.property("upvotes", 3)
        // response.body.should.have.property("comments").with.lengthOf(2)
      })

      it("Should have comments populated", async() => {
        // const response = await request(app)
        //       .get("/noticias/" + mockData.post1._id)
        //       .expect(200)
        //
        // const comment1 = response.body.comments[0]
        // comment1.should.have.property("_id")
        // comment1.should.have.property("body", mockData.comment1.body)
        // comment1.should.have.property("author", mockData.comment1.author)
        //
        // const comment2 = response.body.comments[1]
        // comment2.should.have.property("_id")
        // comment2.should.have.property("body", mockData.comment2.body)
        // comment2.should.have.property("author", mockData.comment2.author)
      })
    })

    context("When querying an non-existing id", () => {
      it("Should return an error", () => {
        // return request(app)
        //       .get("/noticias/590761c5c00daf0caa9b881f" )
        //       .expect(500) //should be 404
      })
    })

  })

  describe("GET /noticias/:noticia", () => {

    context("When querying an existing id", () => {
      it("Should return the exiting object", async() => {
        // const response = await request(app)
        //       .get("/noticias/" + mockData.post1._id)
        //       .expect(200)
        //
        // response.body.should.have.property("_id")
        // response.body.should.have.property("title", "Post #1")
        // response.body.should.have.property("content", "Post #1 content")
        // response.body.should.have.property("upvotes", 3)
        // response.body.should.have.property("comments").with.lengthOf(2)
      })

      it("Should have comments populated", async() => {
        // const response = await request(app)
        //       .get("/noticias/" + mockData.post1._id)
        //       .expect(200)
        //
        // const comment1 = response.body.comments[0]
        // comment1.should.have.property("_id")
        // comment1.should.have.property("body", mockData.comment1.body)
        // comment1.should.have.property("author", mockData.comment1.author)
        //
        // const comment2 = response.body.comments[1]
        // comment2.should.have.property("_id")
        // comment2.should.have.property("body", mockData.comment2.body)
        // comment2.should.have.property("author", mockData.comment2.author)
      })
    })

    context("When querying an non-existing id", () => {
      it("Should return an error", () => {
        // return request(app)
        //       .get("/noticias/590761c5c00daf0caa9b881f" )
        //       .expect(500) //should be 404
      })
    })

  })


  describe("PUT /noticias/:noticia/upvote", () => {

    context("When upvoting an existing id", () => {
      it("Should return the new state of the object", async() => {
        // const response = await request(app)
        //       .put("/noticias/" + mockData.post1._id + "/upvote")
        //       .expect(200)
        //
        // response.body.should.have.property("_id")
        // response.body.should.have.property("title", "Post #1")
        // response.body.should.have.property("content", "Post #1 content")
        // response.body.should.have.property("upvotes", 4)
        // response.body.should.have.property("comments").with.lengthOf(2)
      })

      it("Should save the new upvote counter in the database", async() => {
        // const response = await request(app)
        //       .put("/noticias/" + mockData.post1._id + "/upvote")
        //       .expect(200)
        //
        // const found = await Post.findById(mockData.post1._id)
        // found.should.have.property("upvotes", 4)
      })
    })

    context("When upvoting an non-existing id", () => {
      it("Should return an error", () => {
        // return request(app)
        //       .put("/noticias/590761c5c00daf0caa9b881f/upvote" )
        //       .expect(500)
      })
    })

  })

  describe("Post /project", () => {

    it("Should return the id of the newly created project", async() => {
      const response = await request(app)
          .post("/project")
          .send({name: "next project"})
          .expect(200)
      response.body.should.be.a("string")
    })

    it("Should save the post in the database", async() => {
      // const response = await request(app)
      //       .post("/noticias")
      //       .send({ title: "Post #3", content: "Post #3 content" })
      //       .expect(200)
      //
      // const found = await Post.findById(response.body)
      // should.exist(found)
      //
      // found.should.have.property("_id")
      // found.should.have.property("title", "Post #3")
      // found.should.have.property("content", "Post #3 content")
      // found.should.have.property("upvotes", 0)
      // found.should.have.property("comments").with.lengthOf(0)
    })

    it("Newer post should be returned on /GET noticias", async() => {
      // const response = await request(app)
      //       .post("/noticias")
      //       .send({ title: "Post #3", content: "Post #3 content" })
      //       .expect(200)
      //
      // const response2 = await request(app)
      //       .get("/noticias")
      //       .expect(200)
      //
      // response2.body.should.have.lengthOf(3)
    })
  })

  describe("Post /noticias/:noticia/comentarios", () => {

    context("When commenting an existing id", () => {
      it("Should return a the newly created comment", async() => {
        // const response = await request(app)
        //       .post("/noticias/" + mockData.post1._id + "/comentarios")
        //       .send({ body: "Comment #3 on Post #1" })
        //       .expect(200)
        //
        // response.body.should.have.property("_id")
        // response.body.should.have.property("body", "Comment #3 on Post #1")
        // response.body.should.have.property("upvotes", 0)
      })

      it("Should save the comment in the database", async() => {
        // const response = await request(app)
        //       .post("/noticias/" + mockData.post1._id + "/comentarios")
        //       .send({ body: "Comment #3 on Post #1" })
        //       .expect(200)
        //
        // const found = await Comment.findById(response.body)
        // should.exist(found)
        //
        // found.should.have.property("_id")
        // found.should.have.property("body", "Comment #3 on Post #1")
        // found.should.have.property("upvotes", 0)
        // found.should.have.property("post").deep.equal(mockData.post1._id)
      })

      it("Should add the comment to the parent post", async() => {
        // const response = await request(app)
        //       .post("/noticias/" + mockData.post1._id + "/comentarios")
        //       .send({ body: "Comment #3 on Post #1" })
        //       .expect(200)
        //
        // const found = await Post.findById(mockData.post1._id)
        // should.exist(found)
        //
        // found.should.have.property("comments").that.has.lengthOf(3)
      })

    })

    context("When commenting an non-existing id", () => {
      it("Should return an error", () => {
        // return request(app)
        //       .post("/noticias/590761c5c00daf0caa9b881f/comentarios" )
        //       .expect(500)
      })
    })

  })

})
