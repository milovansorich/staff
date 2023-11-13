var express = require('express');
var router = express.Router();
const usersService = require("@services/users.js");
const jobPostingsService = require("@services/job_postings.js");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var jobs = await jobPostingsService.findJobPostingByState('I');
  res.render('vacants', { user: req.session.user, role: req.session.role, jobs: jobs});
});

router.post('/:jobCode', async function(req, res, next) {
  var jobs = await jobPostingsService.findJobPosting(req.params.jobCode);
  let job = jobs[0];
  job['assigned'] = '';
  job['applicants'] = [];
  job['state'] = 'A'; //Estado Activo
  await jobPostingsService.updateJobPosting(job);

  res.redirect('/vacants');

});

module.exports = router;
