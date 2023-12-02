"use strict";
const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    first_name: { type: String, require: true, maxLength: 100 },
    last_name: { type: String, require: true, maxLength: 50 },
    email: { type: String, require: true, unique: true, maxLength: 50 },
    gender: { type: String, require: true, enum: ["Male", "Female", "Other"], maxLength: 25 },
    salary: { type: Number, require: true }
});
const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;