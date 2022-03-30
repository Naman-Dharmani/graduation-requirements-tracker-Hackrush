const express = require("express");
const router = express.Router();

const { loginUser, registerUser, getUserCourses } = require("../controllers/userController");

router.get("/login", (req, res) => {
  res.status(200).render("login", { pageTitle: "User Login" });
});

router.get("/register", (req, res) => {
  res.status(200).render("register", { pageTitle: "User Registration" });
});

router.get('/courses', getUserCourses);

router.post('/login', loginUser);

router.post("/register", registerUser);

module.exports = router;
