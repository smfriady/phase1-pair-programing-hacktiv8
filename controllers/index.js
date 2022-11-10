class Controller {
    /**
     * Home page
     */
    static homePage(req, res) {
        res.render('home');
    }

    static loginPage(req, res){
        res.render('login')
    }
}

module.exports = Controller;