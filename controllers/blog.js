const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});
blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    url: body.url,
    likes: body.likes,
  });
  try {
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
  blog
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));

  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

module.exports = blogRouter;
