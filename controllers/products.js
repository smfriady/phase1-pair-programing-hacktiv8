const { User, Product, Order, Category } = require('../models');
const formatCurrency = require('../helpers/formatCurrency');

class Controller {
    static getProduct(req, res) {
        const isLoggin = req.session.email;
        const { productName } = req.params;

        const options = {
            include: {
                model: Category
            },
            where: {
                name: productName
            }
        };


        let dataProduct;

        Product.findOne(options)
            .then((data) => dataProduct = data)
            .then(() => Category.findAll())
            .then((dataCategory) => res.render('product_detail', { categories: dataCategory, product: dataProduct, formatCurrency, isLoggin }))
            .catch((err) => res.send(err));

    }

    static loginPage(req, res) {
        res.render('login');
    }
}

module.exports = Controller;