const { poolPromise, sql } = require('../configs/db');

class UserController {
    static async getAllUser(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM User');
            return res.status(200).json(result.recordset);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
