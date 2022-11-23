const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const Blog = require("./models/blogs");
const { response } = require("express");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);

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
