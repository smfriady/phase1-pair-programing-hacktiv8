const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', Controller.login); 

router.get('/', authMiddleware, Controller.user)
router.get('/logout', authMiddleware, Controller.logout)

module.exports = router;