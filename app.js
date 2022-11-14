const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
// const notesRouter = require('./controllers/notes')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl =
  "mongodb+srv://ManjilaNep:CWfDWJwGtqp8tLXV@cluster0.6bqbifp.mongodb.net/bloglist?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);
// console.log(mongoUrl)

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
