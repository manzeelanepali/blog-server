const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
//  const { request, response } = require("../app");
// const User = require("../models/user");
const Blog = require("../models/blogs");
const User = require("../models/user");
// const config = require("../utils/config");
const bcrypt = require("bcrypt");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
  });

  response.json(blogs);
});

// helper function

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    // const token = getTokenFrom(request);
    // const token = request.token;
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token missing or invalid" });
    // }
    // const user = await User.findById(decodedToken.id);

    // console.log("i am body", body);
    if (!body.likes) {
      body.likes = 0;
    }
    if (!body.title || !body.url) {
      response.status(400).json({ error: "missing property" });
    } else {
      const token = request.token;
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
      }

      const user = await User.findById(decodedToken.id);

      {
        const blog = new Blog({
          title: body.title,
          author: body.author,
          likes: body.likes,
          url: body.url,
          user: user,
        });

        const newsave = await blog.save();
        user.blogs = user.blogs.concat(newsave._id);
        await user.save();
        response.status(201).json(newsave);
      }
    }
  } catch (error) {
    next(error);
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
    const user = request.user;
    console.log("i am the user", user);

    const blogId = request.params.id;

    const blog = await Blog.findById(blogId);
    console.log("i am user", blog);
    if (!blog) {
      response.status(404).json({ error: "This id doesn't exist" });
    }
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(blogId);
      response.status(204).json({ message: "deleted successfully" }).end();
    }
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
