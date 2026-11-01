const User = require("../models/userModel");

async function getUsers(req, res) {
    const users = await User.find({
        _id: { $ne: req.user.id }
    }).select("username profilePicture");

    res.status(200).json({
        users: users
    });
}

module.exports = { getUsers };