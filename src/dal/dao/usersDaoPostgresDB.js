const DAO = require('./dao');
const config = require('../../config');
const { Client } = require('pg');

function UsersDaoPostgresDB() {
    this.connection = null;
    this.client = null
}

UsersDaoPostgresDB.prototype = Object.create(DAO.prototype);
UsersDaoPostgresDB.prototype.constructor = UsersDaoPostgresDB;

UsersDaoPostgresDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.postgres.connectionPostgres;

    this.client = new Client(url);
    this.client.connect()
        .then(() => {
            this.connection = true;
        })
        .catch((error) => {
            console.log(error);
        })

};

UsersDaoPostgresDB.prototype.create = async function (obj) {
    await this.client.query(`insert into users(name, email, password) values($1,$2,$3)` , [obj.name,obj.email,obj.password])
};

UsersDaoPostgresDB.prototype.readUser = async function(email, password) {
    return await this.client.query(`select * from users where email=$1 and password =$2` , [email , password])
        .then((users)=>users.rows[0])
};

UsersDaoPostgresDB.prototype.readAll = async function () {
    return await this.client.query('select * from users')
        .then((users) => users.rows)
};

UsersDaoPostgresDB.prototype.readUserToId = async function(id) {
    let user;
    await this.client.query(`select * from users where _id = $1` , [id])
        .then((r)=>{user = r.rows});
    return user
};

module.exports = UsersDaoPostgresDB;