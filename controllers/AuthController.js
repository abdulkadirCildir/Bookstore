const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const checkFunction = require('../helpers/checkFunction');

exports.authRegister = async (req, res) => {
    // TODO: Register func.
    // req.body.firstName, lastName.....

    const { firstName, lastName, email, password } = req.body;  // req cok fazla data döndürdügü icin icerisindeki body yeterli..

    // TODO1: Validate the fields
    const validationErr = validationResult(req);
    checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

    // TODO2: check already  register
    const userData = await User.findOne({ email });
    // console.log("userData", userData);
    checkFunction(res, userData, "User already exists!!");

    // TODO3: crpyt password
    const salt = await bcrypt.genSalt(10);  // Crypt password
    // console.log("salt", salt);
    const newPassword = await bcrypt.hash(password, salt);
    // console.log("newPassword", newPassword);

    // TODO4: save the user to DB
    const user = new User({
        firstName,
        lastName,
        email,
        password: newPassword, // crypted password
    });
    await user.save();

    // TODO: Error handling for saving
    res.send("Register Completed.");
};

exports.authLogin = async (req, res) => {
    const { email, password } = req.body;

    // Field Validation
    const validationErr = validationResult(req);
    checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

    // User exist check
    const userData = await User.findOne({ email });
    checkFunction(res, !userData, "User doesn't exists!!");

    // Password compare
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    checkFunction(res, !isPasswordMatch, "Invalid credentials");

    // Authentication JSON WEB TOKEN - JWT
    jwt.sign(
        { userData },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
            checkFunction(res, err, "Unknown Error");
            res.status(202).json({ token });
        }
    );
};
