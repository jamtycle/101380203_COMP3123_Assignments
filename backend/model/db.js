"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGOURI;

async function connectDB() {
    const status = mongoose.connection.readyState;
    if (status !== 1) await mongoose.connect(URI, { dbName: "full-stack" });
}

const getDBStatus = () => mongoose.STATES[mongoose.connection.readyState];

module.exports = { getDBStatus, connectDB };