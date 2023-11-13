var express = require('express');
var router = express.Router();
const professionalRoleService = require("@services/professional_roles.js");
const usersService = require("@services/users.js");
const personalInformationService = require("@services/personal_information.js");
const professionalInformationService = require("@services/professional_information.js");
const professionalExperiencesService = require("@services/professional_experiences.js");


/* GET home page. */
router.get('/', async function(req, res, next) {
  var records = await professionalRoleService.findProfessionalRoles();
  var personalInformation = await personalInformationService.findPersonalInformation(req.session.user);
  var professionalInformation = await professionalInformationService.findProfessionalInformation(req.session.user);
  var professionalExperiences = await professionalExperiencesService.findProfessionalExperiences(req.session.user);
  var experiences = [];
  console.log(professionalExperiences[0]);
  if(professionalExperiences.length>0){
    experiences = professionalExperiences[0].experiences;
  }

  res.render('profile', { 
    user: req.session.user, 
    role: req.session.role,
    personalInformation: personalInformation[0], 
    professionalInformation: professionalInformation[0], 
    experiences: experiences,
    roles: records });
});

router.get('/:user', async function(req, res, next) {
  console.log('user:'+req.params.user);
  var records = await professionalRoleService.findProfessionalRoles();
  var personalInformation = await personalInformationService.findPersonalInformation(req.params.user);
  var professionalInformation = await professionalInformationService.findProfessionalInformation(req.params.user);
  var professionalExperiences = await professionalExperiencesService.findProfessionalExperiences(req.params.user);

  console.log(personalInformation);
  console.log(professionalInformation);

  res.render('profile', { 
    user: req.params.user, 
    role: null,
    personalInformation: personalInformation[0], 
    professionalInformation: professionalInformation[0], 
    experiences: professionalExperiences[0],
    roles: records });
});

router.post('/', async function(req, res, next) {
  let user = {
    email: req.body.email,
    password: req.body.password,
    type: 'applicant'
  };

  if(req.body.password==""){
    user = {
      email: req.body.email,
      type: 'applicant'
    };
  }
  

  const personalInformation = {
    email: req.body.email,
    about: req.body.about,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
  
  let message = "Información guardada con éxito!.";
  await usersService.updateUser(user);
  await personalInformationService.updatePersonalInformation(personalInformation);
  await professionalInformationService.updateProfessionalInformation(professionalInformation);

  res.redirect('/profile');
});

module.exports = router;
