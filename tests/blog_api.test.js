const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blogs");

const api = supertest(app);
const initialBlogs = [
  {
    title: "Practice",
    author: "Niru Kumari",
    url: "this and this",
  },
  {
    title: "Arna Buffalo",
    author: "Niru Magar",
    url: "this and that",
    likes: 18,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
}, 10000);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    //.expect("Content-Type", "application/json; charset=utf-8");
    .expect("Content-Type", /application\/json/); // this is regular expression
}, 10000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

// test("a specific note is within the returned notes", async () => {
//   const response = await api.get("/api/blogs");

//   const contents = response.body.map((r) => r.content);
//   expect(contents).toContain("Browser can execute only Javascript");
// });
test("a specific blog is within the returned blog", async () => {
  const response = await api.get("/api/blogs");

  const blogTitle = response.body.map((r) => r.title);
  expect(blogTitle).toContain("Practice");
});
test("verifying blog post by unique id by database _id", async () => {
  //for verifying _id in id key
  const response = await api.get("/api/blogs");
  // console.log("iam response", response.body[0].id);
  expect(response.body[0].id).toBeDefined();
});
test("throwing an error ,if title and url property missing", async () => {
  const newBlog = {
    author: "kanchi",
    likes: 403,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("deleting single blog post", async () => {
  const deleteBlog = await Blog.find({
    title: "Practice",
  });
  console.log("what's comes in deleteblog", deleteBlog);
  await api.delete(`/api/blogs/${deleteBlog[0]._id}`).expect(204);
  const remainedBlog = await Blog.find({});
  console.log("iam reemainedblog", remainedBlog);
  const blogTitle = remainedBlog.map((r) => {
    return r.title;
  });
  expect(blogTitle).not.toContain("practice");
});

test("updating the likes in the blog", async () => {
  const updateBlog = await Blog.find({ title: "Practice" });
  const updatedLike = {
    likes: 100,
  };
});

afterAll(() => {
  mongoose.connection.close();
});
