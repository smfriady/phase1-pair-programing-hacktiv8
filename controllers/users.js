const { User } = require('../models');
const bcrypt = require('bcryptjs');

class Controller {

    static login(req, res) {
        let { email, password } = req.body;
        User.findOne({
            where: {
                email: email
            }
        }).then(data => {
            if (data) {
                let comp = bcrypt.compareSync(password, data.password);
                if (comp) {
                    req.session.email = email;
                    res.redirect('/users');
                } else {
                    res.redirect('/login?error=password salah');
                }
            } else {
                res.redirect('/login?error=email salah');
            }
        })
            .catch(err => {
                console.log(err);
            });
    }

    static user(req, res) {
        const isLoggin = req.session.email;
        User.findOne({ where: { email: req.session.email } })
            .then(data => {
                console.log(data.role);
                if (data.role == 'Admin') {
                    User.findAll()
                        .then(list => { 
                            res.render('akun', { data, list, isLoggin });
                        })
                        .catch(err => {
                            res.send(err);
                        });
                } else {
                    res.render('akun', { data, list: false, isLoggin });
                }

            })
            .catch(err => {
                res.send(err);
            });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = Controller;