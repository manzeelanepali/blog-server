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

module.exports = {
  reverse,
  average,
  dummy,
  totallikes,
};
