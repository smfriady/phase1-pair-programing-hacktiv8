class Controller {
    /**
     * Home page
     */
    static homePage(req, res) {
        res.render('home');
    }
}

module.exports = Controller;