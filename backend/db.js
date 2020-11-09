const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.PG_PORT,
    database: process.env.DBNAME
})

module.exports = pool;