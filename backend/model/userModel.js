"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, require: true, index: true, maxLength: 100 },
    email: { type: String, unique: true, require: true, maxLength: 50 },
    password: { type: String, require: true, maxLength: 50 }
});
const UserModel = mongoose.model("user", userSchema);

const findUserById = async (_uid) => {
    return await UserModel.findOne({ _id: _uid });
};

const loginUser = async (_username, _password) => {
    return await UserModel.findOne({
        ...(_username.includes("@") ? { email: _username } : { username: _username }),
        password: _password
    });
};

module.exports = { UserModel, findUserById, loginUser };