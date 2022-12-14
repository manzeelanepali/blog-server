// const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
// const Blog = require("./models/blogs");
// const User = require("./models/user");
const middleware = require("./utils/middleware");
// const { response } = require("express");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
//app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// const mongoUrl =
//   "mongodb+srv://ManjilaNep:CWfDWJwGtqp8tLXV@cluster0.6bqbifp.mongodb.net/bloglist?retryWrites=true&w=majority";
// mongoose.connect(mongoUrl);
// console.log(mongoUrl);

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

module.exports = app;
