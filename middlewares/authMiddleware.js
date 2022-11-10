function authMiddleware(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/login?error=login dulu yaa');
    }
}

module.exports = authMiddleware;