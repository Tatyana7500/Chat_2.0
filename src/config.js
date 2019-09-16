const constants = require('./constants');

module.exports = {
    databaseType: constants.POSTGRES,
    settings: {
        mongo: {
            connectionString: 'mongodb://localhost:27017',
        },
        postgres: {
            connectionPostgres: {
                user: "postgres",
                password: "knopka",
                host: "localhost",
                port: 5432,
                database: "chatDB"
            }
        }
    },
};