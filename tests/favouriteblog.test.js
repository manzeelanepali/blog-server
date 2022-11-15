const listHelper = require("../utils/list_helper");
describe("favorite Blog", () => {
  const mostLikes = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];
  test("when list has one blog, equals the same blog", () => {
    const result = listHelper.favoriteBlog(mostLikes);
    expect(result).toStrictEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
  test("when list has more than one blog, equals the most likes blog", () => {
    const mostLikes = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 30,
      },
    ];
    const result = listHelper.favoriteBlog(mostLikes);
    expect(result).toStrictEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 30,
    });
  });
});
