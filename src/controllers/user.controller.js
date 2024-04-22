const { poolPromise, sql } = require('../configs/db');

class UserController {
    static async getAllUser(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM Users');
            return res.status(200).json(result.recordset);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async getAllUserByStoredProcedure(req, res) {
        try {
            const pool = await poolPromise;
            const storedProcedureAllUser = await pool.request().execute(`SelectAllUsers`);
            return res.status(200).json(storedProcedureAllUser.recordset);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async searchUserByStoredProcedure(req, res) {
        const { name } = req.body;
        try {
            const pool = await poolPromise;
            const searchUserByFirstName = await pool
                .request()
                .input('FirstName', name)
                .execute(`SearchUserByFirstName`);
            return res.status(200).json(searchUserByFirstName.recordset);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
