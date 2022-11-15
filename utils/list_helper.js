const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};
const dummy = (blogs) => {
  return 1;
};
const totallikes = (like) => {
  console.log("hi", like);

  return like.reduce((a, b) => a + b.likes, 0);
};
const favoriteBlog = (mostLike) => {
  console.log("highlike", mostLike);
  let highlike = mostLike.reduce((preVal, curVal) => {
    if (mostLike.length === 1) {
      console.log(mostLike.length);
      preVal = {
        title: curVal.title,
        author: curVal.author,
        likes: curVal.likes,
      };
    } else {
      if (preVal.likes < curVal.likes) {
        preVal = {
          title: curVal.title,
          author: curVal.author,
          likes: curVal.likes,
        };
      } else {
        preVal = {
          title: curVal.title,
          author: curVal.author,
          likes: curVal.likes,
        };
      }
    }
    console.log("val", preVal);
    return preVal;
  }, {});
  return highlike;
};

module.exports = {
  reverse,
  average,
  dummy,
  totallikes,
  favoriteBlog,
};
