const dotenv = require("dotenv");
dotenv.config(
    {
        path: `./${process.env.NODE_ENV.trim()}.env`
    }
)



module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    DB: {
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_PORT: process.env.DB_PORT || 3307,
        DB_USER: process.env.DB_USER || "root",
        DB_PASSWORD : process.env.DB_PASSWORD || "",
        DB_NAME: process.env.DB_NAME || "GymPal",
    }
};