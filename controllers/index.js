const { User, Product, Order, Category } = require('../models');
const formatCurrency = require('../helpers/formatCurrency');
const bcrypt = require('bcryptjs');

class Controller {
    /**
     * Home page
     */
    static homePage(req, res) {
        const { category } = req.query;
        const isLoggin = req.session.email;
        const options = {
            include: {
                model: Category
            },
            order: [['name', 'asc']],
        };

        if (category) {
            options.include.where = {
                name: category.trim()
            };
        };

        let cartQrty = req.query.qty;
        let dataProduct;

        Product.findAll(options)
            .then((data) => dataProduct = data)
            .then(() => Category.findAll())
            .then((dataCategory) => res.render('home', {
                categories: dataCategory, products: dataProduct, formatCurrency, isLoggin, cartQrty
            }))
            .catch((err) => res.send(err));

    }

    static loginPage(req, res) {
        const isLoggin = req.session.email;
        res.render('login', { isLoggin });
    }

    static registerPage(req, res) {
        const isLoggin = req.session.email;
        if (isLoggin) {
            res.redirec('/');
        } else {
            res.render('register', { isLoggin });
        }
    }

    static submitDataRegister(req, res) {
        const { name, email, password } = req.body;
        const isLoggin = req.session.email;
        const payload = {
            name, email, password
        };
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            payload.password = hash;
            payload.role = 'Customer';
        }

        User.create(payload)
            .then((_) => res.redirect('/login'))
            .catch((err) => res.send(err));
    }
}

module.exports = Controller;