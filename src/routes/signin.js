var express = require('express');
var router = express.Router();

const professionalRoleService = require("@services/professional_roles.js");
const usersService = require("@services/users.js");
const personalInformationService = require("@services/personal_information.js");
const professionalInformationService = require("@services/professional_information.js");

/* GET signin page. */
router.get('/', async function(req, res, next) {
  var records = await professionalRoleService.findProfessionalRoles()

  res.render('signin', { roles: records });
});

router.post('/', async function(req, res, next) {

  const user = {
    email: req.body.email,
    password: req.body.password,
    type: 'applicant'
  };

  const personalInformation = {
    email: req.body.email,
    about: req.body.about,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    country: req.body.country,
    street: req.body.street,
    city: req.body.city,
    region: req.body.region
  };

  const backend = {
    languages: {
      Java: req.body.BackendLangJava,
      Python: req.body.BackendLangPython,
      Ruby: req.body.BackendLangRuby,
      Php: req.body.BackendLangPhp,
    },
    libraries: {
      SpringBoot: req.body.BackendLibSpringBoot,
    }
  };

  const frontend = {
    languages: {
      Javascript: req.body.FrontendLangJavascript,
      Java: req.body.FrontendLangJava,
      Ruby: req.body.FrontendLangRuby,
      Php: req.body.FrontendLangPhp,
    },
    libraries: {
      Express: req.body.FrontendLibExpress,
      React: req.body.FrontendLibReact,
      Vaadin: req.body.FrontendLibVaadin,
      Vue: req.body.FrontendLibVue
    }
  };

  const professionalInformation = {
    email: req.body.email,
    Backend: backend,
    Frontend: frontend
  };
  
  const userFound = await usersService.findUser(req.body.email);
  let state = 0; //exito
  let message = "Enhorabuena, ya estás registrado!.";
  if(userFound.length == 0){
    await usersService.insertUser(user);
    await personalInformationService.insertPersonalInformation(personalInformation);
    await professionalInformationService.insertProfessionalInformation(professionalInformation);
  }else{
    state = 1; //error
    message = "Ya se encuentra un usuario registrado con este email('"+req.body.email+"').";
  }
  res.render('process_signin', { state: state, message: message });
});

module.exports = router;
