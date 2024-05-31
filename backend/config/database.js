const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,  
    ssl: {
        require: true,
    },
});

pool.connect().then(() => {
    console.log('Connected to the NeonDB');
}).catch(error => {
    console.error('Connection error', error);
});

module.exports = pool;
