const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'shopmate',
  user: 'user1', // Update this to be "postgres"
  password: 'password' // You might not need this, but probably it's "postgres" as well
});

module.exports = db;