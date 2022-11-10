const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users')

router.post('/login', Controller.login);

router.use((req, res, next) => {
    if(req.session.email){
        next()
    }else{
        res.redirect('/login?error=login dulu yaa')
    }
})

router.get('/', Controller.user)
router.get('/logout', Controller.logout)

module.exports = router;