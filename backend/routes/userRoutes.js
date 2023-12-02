"use strict";
const express = require("express");
const { UserModel, loginUser } = require("../model/userModel");
const { getToken } = require("../auth/tokenGenerator");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
    try {
        const ps = Buffer.from(req.body.password).toString("base64");
        req.body.password = ps;

        const user = new UserModel(req.body);
        const user_result = await user.save();
        return res.status(201).send({
            username: user_result.username,
            email: user_result.email
        });
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

userRoute.post("/login", async (req, res) => {
    try {
        const user = await loginUser(req.body.username, Buffer.from(req.body.password).toString("base64"));

        if (!user) return res.status(200).send({
            status: false,
            username: req.body.username,
            message: "User not found"
        });

        // TODO: before generating a new token, check if the user have a token stored in the DB
        //      if there is a token, then use that token.
        //      else, generate the token and update the user with that token.
        //      Also, check if the token have expired based on the time on the user.
        //      Missing fields: [ token_expire, token_value ]
        const token = await getToken(user);
        return res.status(200).send({
            status: true,
            username: req.body.username,
            message: "User logged in successfully",
            jwt_token: token.toString()
        });
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

module.exports = userRoute;