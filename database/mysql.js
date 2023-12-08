const mysql = require('mysql2');

class MySQLConnection {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ results, fields });
                }
            });
        });
    }

    async close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}



module.exports = { MySQLConnection }