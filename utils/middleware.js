const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log(request.token);
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({ error: "token missing or invalid" });
    }
    request.user = decodedToken;
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  next(error);
};
// const userExtractor = (request, response, next) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     const decodedToken = jwt.verify(request.token, config.SECRET);
//     if (!decodedToken.id) {
//       response.status(401).json({ error: "token missing or invalid" });
//     }
//     request.user = decodedToken;
//   }
//   next();
// };

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
  //   userExtractor,
};
