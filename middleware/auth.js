module.exports = function (req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({message: 'Not authrorized'});
    //req.isAuthenticated() ? next() : res.redirect('/');
};