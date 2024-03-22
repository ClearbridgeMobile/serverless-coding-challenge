const { HOST, DBNAME, MASTERUSERNAME, MASTERPASSWORD } = process.env

const { Pool } = require('pg');

const config = {
    user: MASTERUSERNAME,
    host: HOST,
    database: DBNAME,
    password: MASTERPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}

// Configure the connection pool
const pool = new Pool(config);

module.exports = pool