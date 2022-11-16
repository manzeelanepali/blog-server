const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app); // supertest le app lai wrap garyo

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    //.expect("Content-Type", "application/json; charset=utf-8");
    .expect("Content-Type", /application\/json/); // this is regular expression
  // this is regular expression
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
