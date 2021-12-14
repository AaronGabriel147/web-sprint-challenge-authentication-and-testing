
module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secrets",    // This gets used in the tokenBuilder "JWT_SECRET" and imported!
    BCRYPT_ROUNDS: process.env.num || 8
};