const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const user = require('./routes/user.route');
const { poolPromise, sql } = require('./configs/db');
require('./configs/db');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.get('/', async (req, res) => {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);
    try {
        await transaction.begin();
        const request = new sql.Request(transaction);
        const users = await request.query('SELECT * FROM Users');
        const user = {
            firstName: 'Nam',
            lastName: 'Nguyen',
            email: 'nam@gmail.com',
            password: 'Nam123@',
            isAdmin: true,
        };
        await request
            .input('firstName', sql.NVarChar, user.firstName)
            .input('lastName', sql.NVarChar, user.lastName)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)
            .input('isAdmin', sql.Bit, user.isAdmin)
            .query(
                'insert into Users(firstName, lastName, email, password, isAdmin) values(@firstName, @lastName, @email, @password, @isAdmin)',
            );
        // await request.query('SELECT * FROM Users WHERE a = 10');
        await transaction.commit();
        return res.status(200).json(users.recordset);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(error);
    }
});
app.use('/api/users', user);
app.listen(port, () => console.log(colors.green(`Server listening on http://localhost:${port}`)));
