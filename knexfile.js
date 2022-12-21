require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
/* TODO: make this more secure */
module.exports = {
  client: "pg",
  connection: {
    host:
      process.env.AWS_DB_HOST ||
      "audiolinx-dev.c8unkui8qstw.eu-north-1.rds.amazonaws.com",
    port: process.env.PORT || 5432,
    user: process.env.AWS_DB_USER || "postgres",
    password: process.env.AWS_DB_PASSWORD || "caOe60h0llztBsTPD2Od",
    database: process.env.DATABASE || "",
  },
  searchPath: [process.env.SCHEMA || "postgres", "public"],
  pool: {
    acquireTimeoutMillis: 300 * 1000,
    createTimeoutMillis: 300 * 1000,
  },
  migrations: {
    directory: "./db/migrations",
    tableName: "knex_migrations",
    schemaName: "public",
    stub: "db/knex.migration.stub.js",
  },
  seeds: {
    extension: "js",
    directory: "./dist/db/seeds",
    stub: "src/db/knex.seed.stub.ts",
  },
};