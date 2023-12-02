# COMP 3123 – Full Stack Development

[![Netlify Status](https://api.netlify.com/api/v1/badges/05342811-90e4-4126-a665-e84e26ebe3ec/deploy-status)](https://app.netlify.com/sites/gbc-full-stack/deploys)
**Made with love by Bruno🧡 101380203**

## Running this project

Created and tested using:

```bash
$ node --version && npm --version && npx --version
v20.8.0
10.2.0
10.2.0
```

Run this project for the first time with:

```bash
npm i && npm start
```

You can only run this after `npm i`:

```bash
npm start
```

## Endpoints

| Sr. # | Method | Endpoint                      | Response Code | Description                                  |
| ----- | ------ | ----------------------------- | ------------- | -------------------------------------------- |
| 1     | POST   | /api/v1/user/signup           | 201           | Allow user to rcreate new account            |
| 2     | POST   | /api/v1/user/login            | 200           | Allow user to access the system              |
| 3     | GET    | /api/v1/emp/employees         | 200           | User can get all employee list               |
| 4     | POST   | /api/v1/emp/employees         | 201           | User can­ create new employee               |
| 5     | GET    | /api/v1/emp/employees/{eid}   | 200           | User can get employee details by employee id |
| 6     | PUT    | /api/v1/emp/employees/{eid}   | 200           | User can update employee details             |
| 7     | DELETE | /api/v1/emp/employees?eid=xxx | ­204         | User can delete employee by employee id      |

## Database specification

Database engine: MongoDB with Mongoose.

### Users Collection:

| Field Name | Type           | Constraint                         |
| ---------- | -------------- | ---------------------------------- |
| _id        | Object			ID    | Auto Generate                      |
| username   | String			(100) | Primary Key                        |
| email      | String			(50)  | Unique                             |
| password   | String			(50)  | May be encrypted with other fields |

### Employee Collection:

| Field Name | Type           | Constraint        |
| ---------- | -------------- | ----------------- |
| _id        | Object			ID    | Auto			Generate   |
| first_name | String			(100) | Required          |
| last_name  | String			(50)  | Required          |
| email      | String			(50)  | Unique            |
| gender     | String			(25)  | Male/Female/Other |
| salary     | Float          | Required          |

## Postman collection

### Variables

| Key      | Value                      |
| -------- | -------------------------- |
| URL      | localhost:3000             |
| PROD_URL | http://170.187.155.55:3005 |

Production API deployed on Linode [Arch] Server using Docker.
