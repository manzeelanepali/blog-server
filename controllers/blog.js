const blogRouter = require("express").Router();
//  const { request, response } = require("../app");
// const User = require("../models/user");
const Blog = require("../models/blogs");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
  });

  response.json(blogs);
});
blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  console.log("i am body", body);
  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title || !body.url) {
    response.status(400).json({ error: "missing property" });
  }
  {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url,
      user: body.userId,
    });
    try {
      const newsave = await blog.save();
      user.blogs = user.blogs.concat(newsave._id);
      await user.save();
      response.status(201).json(newsave);
    } catch (error) {
      next(error);
    }
  }
});

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

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const updateBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      {
        new: true,
      }
    );

    response.status(200).json(updateBlog);
  } catch (error) {
    next(error);
  }
});

// .then(() => {
//   response.status(204).end();
// })
// .catch((error) => next(error));

module.exports = blogRouter;
