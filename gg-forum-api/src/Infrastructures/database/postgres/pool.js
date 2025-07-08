// this file is responsible for creating a connection pool to the PostgreSQL database
// and exporting it for use in other parts of the application

const { Pool } = require("pg");

const pool = new Pool();

module.exports = pool;
