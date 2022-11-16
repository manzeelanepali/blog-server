const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");

const api = supertest(app);
const initialBlogs = [
  {
    title: "Hello",
    author: "Rita",
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    //.expect("Content-Type", "application/json; charset=utf-8");
    .expect("Content-Type", /application\/json/); // this is regular expression
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
