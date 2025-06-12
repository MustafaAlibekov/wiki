const {Pool} = require('pg');

const pool = new Pool( 
{
    host: 'localhost',
    user: 'postgres',
    database: 'wiki',
    password: '12345',
    host: '127.0.0.1',
    port: 5432
});

module.exports = pool;