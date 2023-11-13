var express = require('express');
var router = express.Router();
const usersService = require("@services/users.js");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  const authenticated = await usersService.authenticate(req.body.email, req.body.password, req.body.role);
  if(authenticated){
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = req.body.email
      req.session.role = req.body.role
  
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/')
      })
    })
  } else{
    res.render('login', { message: "Las credenciales son incorrectas."});
  }
  
});  

module.exports = router;
