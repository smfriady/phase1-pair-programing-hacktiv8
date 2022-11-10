const { User, Product, Order, Category } = require('../models');
const formatCurrency = require('../helpers/formatCurrency')

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
            }
        };
 

        let dataProduct;

        Product.findAll(options)
            .then((data) => dataProduct = data)
            .then(() => Category.findAll())
            .then((dataCategory) => res.render('home', { categories: dataCategory, products: dataProduct, formatCurrency, isLoggin }))
            .catch((err) => res.send(err));

    }

    static loginPage(req, res){
        const isLoggin = req.session.email;
        res.render('login', { isLoggin })
    }
}

module.exports = Controller;