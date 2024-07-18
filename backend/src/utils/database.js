const { createPool } = require('mysql2');

const pool = createPool({
    host: 'localhost',
    user: 'Tekhno',
    password: 'Tekhnologia@123',
    database: 'fintek'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (err, results) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

module.exports = { query };
