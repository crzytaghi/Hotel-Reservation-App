const Pool = require('pg').Pool;

const pool = new Pool({
    user: "AndrewTaghi",
    host: "localhost",
    port: 5432,
    database: "hotel"
})

module.exports = pool;