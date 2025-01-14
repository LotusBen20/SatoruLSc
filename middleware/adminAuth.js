function requireAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }
    next();
}

module.exports = { requireAdmin }; 