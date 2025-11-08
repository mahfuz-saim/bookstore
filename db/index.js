const { drizzle } = require("drizzle-orm/postgres-js");

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
