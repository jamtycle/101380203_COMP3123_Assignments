require("dotenv").config();
const { createSecretKey } = require("crypto");
const { SignJWT, jwtVerify } = require("jose");

const secretKey = createSecretKey(process.env.JWT_KEY, "utf-8");

const getToken = async (_payload) => {
    return await new SignJWT({ "gbc:brunoramirez:claim": true, ..._payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(process.env.JWT_EXPIRE)
        .sign(secretKey);
};

const verifyToken = async (_token) => {
    try {
        const { payload, protectedHeader } = await jwtVerify(_token, secretKey, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });
        return { payload: payload._doc, protectedHeader };
    } catch (ex) {
        console.error(ex);
        return undefined;
    }
};

module.exports = { getToken, verifyToken };