const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

// Always require and configure neat the top
require("dotenv").config();
// Connect to the database (after the dotenv)
require("./config/database");

const userRouter = require("./routes/api/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
  app.use(express.static(path.join(__dirname, "build")));
}

// Check for a token on every request
app.use(require("./config/checkToken"));

// API routes here
app.use("/api/users", userRouter);

// "Catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/items", ensureLoggedIn, require("./routes/api/items"));

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
