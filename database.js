const { createPool } = require("mysql");

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Bgichigi@!47",
    database: "opportunity_portal",
});

// Use pool.query() instead of createPool.query()
pool.query('SELECT * FROM opportunity', (err, res) => {
    if (err) throw err;
    console.log(res);
});
