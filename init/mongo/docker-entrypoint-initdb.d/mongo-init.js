print("START");

db = db.getSiblingDB("full-stack");

db.createUser(
    {
        user: "mongoadmin",
        pwd: "password",
        roles: [{role: "readWrite", db: "full-stack"}]
    }
)

db.createCollection("user");

print("END");