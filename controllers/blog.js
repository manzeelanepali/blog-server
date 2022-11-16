const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});
blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title || body.url) {
    response.status(400).json({ error: "missing property" }).end();
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,

    //   const newBlog = await blog.save();
    //   response.status(201).json(newBlog);
    // } catch (error) {
    //   next(error);
    // }
    // blog
    //   .save()
    //   .then((savedNote) => {
    //     response.json(savedNote);
    //   })
    //   .catch((error) => next(error));

    // blog.save().then((result) => {
    //   response.status(201).json(result);
    // });
  });
});

module.exports = blogRouter;
