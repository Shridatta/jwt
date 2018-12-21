const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (request, response) => {
  response.json({
    message: "Welcome to the api"
  });
});

app.post("/api/posts", verifyToken, (request, response) => {
  jwt.verify(request.token, "123456", (err, authData) => {
    if (err) {
      response.sendStatus(403);
    } else {
      response.json({
        message: "Post created",
        authData
      });
    }
  });
});

app.post("/api/login", (request, response) => {
  const user = {
    id: 1,
    name: "Shridatta",
    city: "NJ"
  };
  jwt.sign({ user }, "123456", (err, token) => {
    response.json({
      token
    });
  });
});

function verifyToken(request, response, next) {
  //Format of token
  //Authorization : Bearer <access_token>
  //Get authorization header value
  const bearerHeader = request.headers["authorization"];

  //Check if bearer is undefined
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    //Get the token from array
    const bearerToken = bearer[1];
    //Set the token
    request.token = bearerToken;
    //Next Middleware
    next();
  } else {
    response.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started on port 5000"));
