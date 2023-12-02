"use strict";
const express = require("express");
const EmployeeModel = require("../model/employeeModel");
const { findUserById } = require("../model/userModel");
const { verifyToken } = require("../auth/tokenGenerator");

const empRoute = express.Router();

empRoute.use(async (req, res, next) => {
    const auth = req.header("Authorization");
    if (!auth) return res.status(403).send({ status: false, error: "Forbidden" });

    const { payload } = await verifyToken(auth.replace("Bearer ", ""));
    const user = findUserById(payload._id);
    if (!user) return res.status(403).send({ status: false, error: "Forbidden" });

    return next();
});

empRoute.get("/", async (req, res) => {
    try {
        return res.status(200).send(await EmployeeModel.find());
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.post("/", async (req, res) => {
    try {
        const employee = new EmployeeModel(req.body);
        const result = await employee.save();
        // console.log("Employee created: ", result);
        return res.status(201).send(result);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        } else if (ex.constructor.name === "ValidationError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.get("/:ied", async (req, res) => {
    try {
        const employee = await EmployeeModel.findOne({ _id: req.params.ied });
        return res.status(200).send(employee);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.put("/:ied", async (req, res) => {
    try {
        // TODO: do not require the whole object to update.
        const ndata = new EmployeeModel(req.body);
        const val = ndata.validateSync();
        if (val) throw val;

        const status = await EmployeeModel.updateOne({ _id: req.params.ied }, {
            $set: {
                ...(!ndata.first_name ? {} : { first_name: ndata.first_name }),
                ...(!ndata.last_name ? {} : { last_name: ndata.last_name }),
                ...(!ndata.email ? {} : { email: ndata.email }),
                ...(!ndata.gender ? {} : { gender: ndata.gender }),
                ...(!ndata.salary ? {} : { salary: ndata.salary }),
            }
        });
        return res.status(200).send(status);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        } else if (ex.constructor.name === "ValidationError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.delete("/", async (req, res) => {
    try {
        if (!req.query.eid) return res.status(500).send({ status: false, error: "eid was not provided." });
        const status = await EmployeeModel.deleteOne({ _id: req.query.eid });
        return res.status(200).send(status);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

module.exports = empRoute;