const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db')
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(errorHandler);

// Welcome Page
app.get("/", (req, res) => {
  res.status(200).render("index", { pageTitle: "Graduation Requirements Tracker" });
});

// User Routes
app.use("/user", require("./routes/userRoutes"));

// Course Routes
app.use("/courses", require("./routes/courseRoutes"));

// 404 - Page not Found Route
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not Found" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
