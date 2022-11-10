const { User, Product, Order, Category } = require('../models');
const formatCurrency = require('../helpers/formatCurrency')

class Controller { 
    static getProduct(req, res) {
        const { category } = req.query; 
        const { productName } = req.params
        console.log(productName);
        
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
            .then((dataCategory) => res.render('product_detail', { categories: dataCategory, product: dataProduct, formatCurrency }))
            .catch((err) => res.send(err));

    }

    static loginPage(req, res){
        res.render('login')
    }
}

module.exports = Controller;