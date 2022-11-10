const express = require('express');
const Controller = require('../controllers');
const router = express.Router();

// router.use((req, res, next) => {
//     if(req.session.email){
//         res.redirect('/users')
//     }else{
//         next()
//     }
// })

router.get('/', Controller.homePage);
router.get('/login', Controller.loginPage)

module.exports = router;