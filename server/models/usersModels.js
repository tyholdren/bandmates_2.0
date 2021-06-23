const { Pool } = require("pg");
require("dotenv").config();

const PG_URI =
  "postgres://obzhuzsf:kY_Ho0WRyGVLNlo--Akm8P4VpDR87oDD@batyr.db.elephantsql.com/obzhuzsf";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
