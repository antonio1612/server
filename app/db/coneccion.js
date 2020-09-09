const initOptions = {
    // initialization options;
};

const pgp = require('pg-promise')(initOptions);

const cn = "postgres://postgres:147258@127.0.0.1:5432/andicom";
const db = pgp(cn);

module.exports = db;
