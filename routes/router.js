const express = require('express');

// exports.router = express.Router();
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const ProfileRouter = require("./ProfileRouter");
const BookRouter = require("./BookRouter");

// router.get("/", (req, res) => {
//     console.log("Home Page");
//     res.send("Home Page");
// });


// Only/api endpoint
/**
 * @route /api/auth
 * @desc Route for Auth
 */
router.use("/auth", AuthRouter);


/**
 * @route /api/profile
 * @desc Route for Profile
 */
router.use("/profile", ProfileRouter);


/**
 * @route /api/book
 * @desc Route for Book
 */
router.use("/books", BookRouter);


module.exports = router;