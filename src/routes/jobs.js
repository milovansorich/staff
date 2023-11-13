var express = require('express');
var router = express.Router();
const professionalRoleService = require("@services/professional_roles.js");
const jobPostingsService = require("@services/job_postings.js");
const professionalInformationService = require("@services/professional_information.js");

router.get('/:code', async function(req, res, next) {
  var roles = await professionalRoleService.findProfessionalRoles();
  var jobs = await jobPostingsService.findJobPosting(req.params.code);
  res.render('job', { user: req.session.user, role: req.session.role, roles: roles, job: jobs[0]} );
});

router.get('/new', async function(req, res, next) {
  //console.log(req.params.code);  
  var roles = await professionalRoleService.findProfessionalRoles();
  res.render('job', { user: req.session.user, role: req.session.role, roles: roles} );
});

router.post('/new', async function(req, res, next) {
  //console.log(req.params.code);  
  const jobPosting = {
    code: Date.now().toString(36) + Math.random().toString(36).substring(2),
    title: req.body.title,
    about: req.body.about,
    salary: req.body.salary,
    role: req.body.role,
    state: 'A'
  };
  await jobPostingsService.insertJobPosting(jobPosting);
  res.redirect('/');
});

router.post('/apply/:code', async function(req, res, next) {
  const jobs = await jobPostingsService.findJobPosting(req.params.code);
  let job = jobs[0];

  if(job.hasOwnProperty('applicants')){
    if(!job['applicants'].includes(req.session.user)){
      job['applicants'].push(req.session.user);
    }
  }
  else{
    job['applicants'] = [];
    job['applicants'].push(req.session.user);
  }
  

  await jobPostingsService.updateJobPosting(job);
  res.redirect('/');
});

router.post('/edit/:code', async function(req, res, next) {
  const jobs = await jobPostingsService.findJobPosting(req.params.code);
  let job = jobs[0];

  job['title'] = req.body.title;
  job['about'] = req.body.about;
  job['salary'] = req.body.salary;

  await jobPostingsService.updateJobPosting(job);
  res.redirect('/');
});

router.post('/delete/:code', async function(req, res, next) {
  await jobPostingsService.deleteJobPosting(req.params.code);
  res.redirect('/');
});


module.exports = router;