require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "secrets",
    NUM: process.env.num || 8
};