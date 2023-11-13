
module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.session.user) next()
        else next('route')
    }    
};  