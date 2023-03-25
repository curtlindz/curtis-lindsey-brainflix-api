const express = require("express");
const app = express();
const PORT = 8080;
const videos = require("./routes/videos");
const cors = require("cors");

// This middleware implements Cross Origin Resource Sharing (CORS)
app.use(cors());

// This middleware allows us to post JSON in request.body
app.use(express.json());

// This middleware allows us to serve static files from a folder.
app.use(express.static("public/images"));


// Example Middlewares vvvvvvv

// This middleware is just a basic example that runs on every request
// Calling next() is how you pass control to the next middleware
app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
  });
  
  // This middleware is another basic example that runs on every request
  app.use((_req, _res, next) => {
    console.log("Middleware number 2 running");
    next();
  });
  
  // This middleware checks if we're getting JSON headers on our POST requests
  // You can send a response right here and *not* call next() if you don't want to proceed.
  app.use((req, res, next) => {
    if (
      req.method === "POST" &&
      req.headers["content-type"] !== "application/json"
    ) {
      return res.status(400).send("Hey, you need to give me proper JSON");
    }
  
    // If all is well, continue to the next middleware
    next();
  });
  

  app.use("/videos", videos);
  
  // Start the server listening
  // It's convention to have this at the end of the file
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  