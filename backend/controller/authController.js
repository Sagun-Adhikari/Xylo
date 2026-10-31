const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Check existing username
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }
}


// LOGIN
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
}




async function getMe(req, res) {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong"
        });

    }
}

module.exports = { signup, login, getMe };