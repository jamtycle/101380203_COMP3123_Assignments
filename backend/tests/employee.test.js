/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGOURI, { dbName: "full-stack" });
});

afterEach(async () => {
    await mongoose.connection.close();
});

const getJWToken = async () => {
    const payload = { "username": "bramirez206@hotmail.com", "password": "123" };
    const res = await request(app)
        .post("/api/v1/user/login")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

    return `Bearer ${res.body.jwt_token}`;
};

const createEmployee = async(_payload) => {
    const token = await getJWToken();
    const res = await request(app)
        .post("/api/v1/employee")
        .send(_payload)
        .set("Authorization", token);

    expect(res.statusCode).toBe(201);
    expect(Object.keys(res.body).length).toBe(7);
    return res.body._id;
};

const deleteEmployee = async (_id) => {
    const token = await getJWToken();
    const res = await request(app)
        .delete(`/api/v1/employee?eid=${_id}`)
        .set("Authorization", token);

    return res;
};

describe("GET /api/v1/employee", () => {
    it("Returns the whole employee list", async () => {
        const token = await getJWToken();
        const res = await request(app)
            .get("/api/v1/employee")
            .set("Authorization", token);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

describe("POST /api/v1/employee ", () => {
    it("Creates a new Employee document", async () => {
        const payload = { first_name: "unit test", last_name: "CREATE", email: "create@test.com", gender: "Other", salary: 12345.6789 };
        const token = await getJWToken();
        const res = await request(app)
            .post("/api/v1/employee")
            .send(payload)
            .set("Authorization", token);

        expect(res.statusCode).toBe(201);
        expect(Object.keys(res.body).length).toBe(7);

        expect((await deleteEmployee(res.body._id)).statusCode).toBe(200);
    });
});

describe("GET /api/v1/employee/:employee_id ", () => {
    it("Returns an employee with the specified id", async () => {
        const payload = { first_name: "unit test", last_name: "GET ONE", email: "getone@test.com", gender: "Other", salary: 12345.6789 };
        const _id = await createEmployee(payload);
        const token = await getJWToken();
        const res = await request(app)
            .get(`/api/v1/employee/${_id}`)
            .set("Authorization", token);

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ _id: _id, ...payload, __v: 0 });

        expect((await deleteEmployee(_id)).statusCode).toBe(200);
    });
});

describe("PUT /api/v1/employee/:employee_id ", () => {
    it("Update a document with the specified employee id and a document passed on the body", async () => {
        const _id = await createEmployee({ first_name: "unit test", last_name: "UPDATE", email: "putedit@test.com", gender: "Other", salary: 12345.6789 });
        expect(_id).not.toBe(undefined);
        const payload = { first_name: "UNIT TEST", last_name: "update", email: "put@test.com", gender: "Male", salary: 1 };
        const token = await getJWToken();
        const res = await request(app)
            .put(`/api/v1/employee/${_id}`)
            .send(payload)
            .set("Authorization", token);

        expect(res.statusCode).toBe(200);
        expect(res.body.modifiedCount).toBe(1);

        expect((await deleteEmployee(_id)).statusCode).toBe(200);
    });
});

describe("DELETE /api/v1/employee/:employee_id ", () => {
    it("Deletes a document with a specific _id", async () => {
        const _id = await createEmployee({ first_name: "unit test", last_name: "DELETE", email: "delete@test.com", gender: "Other", salary: 12345.6789 });
        expect(_id).not.toBe(undefined);
        const res = await deleteEmployee(_id);

        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(1);
    });
});