const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

//Bodyparser Midlleware
app.use(express.json());

// DB configuration
const db = config.get("mongoURI");

//Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Successfully Connect..."))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Server static assests if in prpduction
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
