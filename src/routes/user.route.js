const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const router = Router();
router.get('/', UserController.getAllUser);
router.get('/all-user', UserController.getAllUserByStoredProcedure);
router.post('/search', UserController.searchUserByStoredProcedure);

module.exports = router;
