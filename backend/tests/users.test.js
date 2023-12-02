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

describe("POST /api/v1/user/signup", () => {
    it("Returns the user information or an error if the user already exists", async () => {
        const payload = { "username": "bramirez", "email": "bramirez206@hotmail.com", "password": "123" };
        const res = await request(app)
            .post("/api/v1/user/signup")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect([201, 500]).toContain(res.statusCode);
        const body = res.body;
        if (res.statusCode === 500) expect(body.error.message).toContain("duplicate");
        else expect(body).toStrictEqual({ username: "bramirez", email: "bramirez206@hotmail.com" });
    });
});

describe("POST /api/v1/user/login ", () => {
    it("Returns if the user exists in the server with a JWToken", async () => {
        const payload = { "username": "bramirez206@hotmail.com", "password": "123" };
        const res = await request(app)
            .post("/api/v1/user/login")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("bramirez206@hotmail.com");
        expect(res.body.message).toBe("User logged in successfully");
    });
});