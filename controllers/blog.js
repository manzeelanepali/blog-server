const blogRouter = require("express").Router();
const { request, response } = require("../app");

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
blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// .then(() => {
//   response.status(204).end();
// })
// .catch((error) => next(error));

module.exports = blogRouter;
