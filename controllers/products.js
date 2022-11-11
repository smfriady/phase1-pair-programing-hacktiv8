const { User, Product, Order, Category } = require('../models');
const formatCurrency = require('../helpers/formatCurrency');

class Controller {
    static getProduct(req, res) {
        const isLoggin = req.session.email;
        const { productName } = req.params;
        let qtyProduct = req.query.qty;

        let cartQrty = 0;

        if (!isNaN(qtyProduct)) {
            cartQrty = +qtyProduct;
        }
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
            .then((dataCategory) => res.render('product_detail', { categories: dataCategory, product: dataProduct, formatCurrency, isLoggin, cartQrty }))
            .catch((err) => res.send(err));

    }

    static renderBuyProduct(req, res) {
        const isLoggin = req.session.email;
        const { productName, qty, nominal, idProduct } = req.params;
        let qtyProduct = req.query.qty;

        let cartQrty = 0;

        if (!isNaN(qtyProduct)) {
            cartQrty = +qtyProduct;
        }
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
            .then((dataCategory) => res.render('orders_page', { categories: dataCategory, product: dataProduct, formatCurrency, isLoggin, cartQrty, qty, nominal, idProduct }))
            .catch((err) => res.send(err));
    }


    static buyProduct(req, res) {
        const { productName, qty, nominal, idProduct } = req.params;
        const userId = req.session.userId;
        const payload = {
            quantity: +qty,
            totalPrice: +nominal,
            isPaid: true,
            isDelivered: true,
            UserId: +userId,
            ProductId: +idProduct
        };

        let tempDataProduct;

        Product.findOne({
            where: { id: +idProduct }
        })
            .then((data) => {
                tempDataProduct = data;
                if ((data.stock - payload.quantity) !== -1) {
                    return Order.create(payload);
                }
            })
            .then(() => Product.update({ stock: tempDataProduct.stock - payload.quantity }, { where: { id: tempDataProduct.id } }))
            .then(() => res.redirect('/users'))
            .catch((err) => res.send(err));


    }
    static loginPage(req, res) {
        res.render('login');
    }
}

module.exports = Controller;