var express = require('express');
var router = express.Router();
const professionalExperiencesService = require("@services/professional_experiences.js");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('professional_experiences', { 
  user: req.session.user, 
  role: req.session.role,
  });
});

router.post('/', async function(req, res, next) {
  const professionalExperiences = {
    jobTittle: req.body.jobTittle,
    businessName: req.body.businessName,
    entryDate: req.body.entryDate,
    departureDate: req.body.departureDate,
    position: req.body.position,
    jobDescription: req.body.jobDescription,
  };
  
  let results = await professionalExperiencesService.findProfessionalExperiences(req.session.user);

  console.log(results);

  if(results!='undefined' && results.length>0){
    let experiences = results[0];
    if(experiences.hasOwnProperty('experiences')){
      experiences['experiences'].push(professionalExperiences);
      await professionalExperiencesService.updateProfessionalExperiences(experiences)
    }
  }else{
    const experiences = {
      email: req.session.user,
      experiences:[professionalExperiences]
    }
    await professionalExperiencesService.insertProfessionalExperiences(experiences);

  }
  
  console.log(professionalExperiences);
  res.redirect('/profile');
});

module.exports = router;
