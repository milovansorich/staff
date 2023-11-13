var express = require('express');
var router = express.Router();
const usersService = require("@services/users.js");
const jobPostingsService = require("@services/job_postings.js");
const professionalInformationService = require("@services/professional_information.js");


router.get('/:jobCode', async function(req, res, next) {
  var jobs = await jobPostingsService.findJobPosting(req.params.jobCode);
  const job = jobs[0];

  var ranking = {};
  const applicants = job.applicants;

  for(applicant of applicants){
    var professionalInformations = await professionalInformationService.findProfessionalInformation(applicant);
    const professionalInformation = professionalInformations[0];
    let points = 0;
    const languages = professionalInformation[job.role].languages;
    Object.keys(languages).forEach(function(key) {
      points += parseInt(languages[key]);
    })
    const libraries = professionalInformation[job.role].libraries;
    Object.keys(libraries).forEach(function(key) {
      points += parseInt(libraries[key]);
    })
    ranking[applicant] = points;
  }; 
  console.log('ranking:'+JSON.stringify(ranking));
  var items = Object.keys(ranking).map(function(key) {
    return [key, ranking[key]];
  });
  
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  
  console.log(items.slice(0, 5));
  res.render('ranking', { user: req.session.user, role: req.session.role, job: job, ranking: items} );
});

router.get('/:jobCode/assign/:user', async function(req, res, next) {
  var users = await usersService.findUser(req.params.user);
  let user = users[0];
  user['type'] = 'staff';

  await usersService.updateUser(user);

  var jobs = await jobPostingsService.findJobPosting(req.params.jobCode);
  let job = jobs[0];
  job['assigned'] = req.params.user;
  job['state'] = 'W'; //Estado trabajando

  await jobPostingsService.updateJobPosting(job);
  res.redirect('/');
});

module.exports = router;
