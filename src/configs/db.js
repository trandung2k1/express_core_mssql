const sql = require('mssql');
require('dotenv').config();
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    port: +process.env.PORTDB,
};
// sql.connect({
//     ...config,
//     beforeConnect: (conn) => {
//         conn.once('connect', (err) => {
//             err
//                 ? console.error(err)
//                 : console.log(colors.green('SQL Server connected successfully'));
//         });
//         conn.once('end', (err) => {
//             err ? console.error(err) : console.log(colors.red('SQL Server disconnected'));
//         });
//     },
// });

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL database.');
        return pool;
    })
    .catch((err) => console.error('Database connection failed! Bad config: ', err));

module.exports = { poolPromise, sql };
