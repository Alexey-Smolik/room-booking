// MIDDLEWARE FOR CHECKING AUTH
module.exports = function (req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({message: 'Not authrorized'});
};