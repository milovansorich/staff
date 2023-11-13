var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    req.session.user = null
    req.session.role = null
    req.session.save(function (err) {
      if (err) next(err)
  
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    })
});

module.exports = router;