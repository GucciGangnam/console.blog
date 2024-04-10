// Imports 
// Async Handler
const asyncHandler = require("express-async-handler")
// Express validator 
//Validator methods
const { body, validationResult } = require("express-validator");
// Import bcrypt
const bcrypt = require('bcryptjs');
// Schemes
const Comments = require("../models/comment")
const Posts = require("../models/post")
const Users = require("../models/user")
// UUID v4
const { v4: uuidv4 } = require('uuid');
// Import JWT
const jwt = require("jsonwebtoken");

// User Controller functions // 
exports.create_user = [
    // validate and sanitize
    body("username")
        .trim()
        .isLength({ min: 3, max: 15 }).withMessage('Nice try but the username must be between 3 and 15 characters long')
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Nice try but the username can only contain letters and numbers");
            }
            return true;
        }),
    body("email")
        .trim()
        .isEmail()
        .toLowerCase()
        .withMessage('Invalid email address'),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one capital letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number"),
    // Run function
    asyncHandler(async (req, res, next) => {
        // Check is any errors were thown from validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ msg: errors })
        }
        const { email, username, password } = req.body;
        // check username doesnmt already exist // README: THIS THROWS A 409 ERROR SO FRONTEND CAN HANDLE THIS SPESIFICALLY (DISPLAY TO USER)
        const existingUser = await Users.findOne({ $or: [{ USERNAME: username }, { USERNAME: { $regex: new RegExp('^' + username + '$', 'i') } }] });
        if (existingUser) {
            return res.status(409).json({ msg: "This username is already taken" });
        }
        // check email doesnt already exist // README: THIS THROWS A 409 ERROR SO FRONTEND CAN HANDLE THIS SPESIFICALLY (DISPLAY TO USER)
        const existingEmail = await Users.findOne({ EMAIL: email })
        if (existingEmail) {
            return res.status(409).json({ msg: "This email is already in use" })
        }
        // bcrypt password here
        const hashedPassword = await bcrypt.hash(password, 10);
        // Get users IP 
        const ipAddress = req.socket.remoteAddress;
        // Save new user 
        const newUserID = "UID" + uuidv4()
        const newUser = new Users({
            ID: newUserID,
            USERNAME: username,
            PASSWORD: hashedPassword,
            EMAIL: email,
            IP_ADDRESSES: [ipAddress]
        })
        newUser.save();
        return res.status(200).json({ msg: "User Created" })
    })
]
// Get user Info
exports.read_user = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - Valid User Access Token 
    try {
        const userID = req.userId
        const user = await Users.findOne({ ID: userID })
        const publicUserInfo = {
            USERNAME: user.USERNAME,
            FIRST_NAME: user.FIRST_NAME,
            LAST_NAME: user.LAST_NAME,
            EMAIL: user.EMAIL,
        }
        return res.status(200).json({ publicUserInfo })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Database error" })
    }
})
// Update user profile fiels individually
exports.update_user_firstname = [
    body("firstname")
        .trim()
        .isLength({ min: 3, max: 25 }).withMessage("Nice try but the firstname must be between 3 and 25 characters long")
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Nice try but the firstname can only contain letters and numbers");
            }
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors })
        }
        // Extract sanitized name from req.body
        const { firstname } = req.body;
        // Extract user id from req.userID set by accesstoken validation middleware
        const userID = req.userId
        // Udate the user first name
        try {
            await Users.updateOne({ ID: userID }, { $set: { FIRST_NAME: firstname } })
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: 'Database error.  Try again later' })
        }
        res.status(200).json({ MSG: "User firstname Updated" })
    })
]
exports.update_user_lastname = [
    body("lastname")
        .trim()
        .isLength({ min: 3, max: 25 }).withMessage("Nice try but the lastname must be between 3 and 25 characters long")
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Nice try but the lastname can only contain letters and numbers");
            }
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors })
        }
        // Extract sanitized name from req.body
        const { lastname } = req.body;
        // Extract user id from req.userID set by accesstoken validation middleware
        const userID = req.userId
        // Udate the user first name
        try {
            await Users.updateOne({ ID: userID }, { $set: { LAST_NAME: lastname } })
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: 'Database error.  Try again later' })
        }
        res.status(200).json({ MSG: "User lastname Updated" })
    })
]
exports.update_user_email = [
    body("email")
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors })
        }
        // Extract sanitized name from req.body
        const { email } = req.body;
        // Extract user id from req.userID set by accesstoken validation middleware
        const userID = req.userId
        // Udate the user first name
        try {
            await Users.updateOne({ ID: userID }, { $set: { EMAIL: email } })
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: 'Database error.  Try again later' })
        }
        res.status(200).json({ MSG: "User email Updated" })
    })
]
exports.update_user_password = [
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one capital letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number"),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors })
        }
        // Extract sanitized name from req.body
        const { password } = req.body;
        // bcrypt password here
        const hashedPassword = await bcrypt.hash(password, 10);
        // Extract user id from req.userID set by accesstoken validation middleware
        const userID = req.userId
        // Udate the user first name
        try {
            await Users.updateOne({ ID: userID }, { $set: { PASSWORD: hashedPassword } })
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: 'Database error.  Try again later' })
        }
        res.status(200).json({ MSG: "User password Updated" })
    })
]
// Delete User //
exports.delete_user = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - Valid User Access Token 
    const userID = req.userId
    try {
        await Users.deleteOne({ ID: userID })
        res.status(200).json({ MSG: "User Deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Database Error" })
    }
})

// Login User // 
exports.login_user = asyncHandler(async (req, res, next) => {
    // Require req.body.username - req.body.password
    const username = req.body.username;
    const password = req.body.password;

    // Does user exisit? 
    const existingUser = await Users.findOne({ $or: [{ USERNAME: username }, { USERNAME: { $regex: new RegExp('^' + username + '$', 'i') } }] });
    if (!existingUser) {
        return res.status(400).json({ msg: "Username / password combo not found" });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.PASSWORD);
    if (!passwordMatch) {
        return res.status(400).json({ msg: "Username / password combo not found" });
    }
    //////// THIS IS A JWT TEST  DELETE ME DELETE ME DELETE ME DELETE ME DELETE ME DELETE ME ///
    const payload = {
        username: existingUser.USERNAME,
        userId: existingUser.ID,
    }
    const secretKey = process.env.API_SECURITY_KEY;
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '60m' })
    console.log(accessToken)
    //////// THIS IS A JWT TEST  DELETE ME DELETE ME DELETE ME DELETE ME DELETE ME DELETE ME ///
    return res.status(200).json({ accessToken: accessToken })
})