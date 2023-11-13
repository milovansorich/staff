var express = require('express');
var router = express.Router();
const usersService = require("@services/users.js");
const jobPostingsService = require("@services/job_postings.js");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var jobs = await jobPostingsService.findJobPostingAssigned(req.session.user);
  const job = jobs[0];
  res.render('replacement', { user: req.session.user, role: req.session.role, job: job});
});

router.post('/:jobCode', async function(req, res, next) {
  var jobs = await jobPostingsService.findJobPosting(req.params.jobCode);
  let job = jobs[0];
  const userName = job['assigned'];
  job['assigned'] = '';
  job['state'] = 'I'; //Estado trabajando
  await jobPostingsService.updateJobPosting(job);

  var users = await usersService.findUser(userName);
  let user = users[0];
  user['type'] = 'applicant';

  await usersService.updateUser(user);

  res.render('replacement', { user: req.session.user, role: req.session.role});

});

module.exports = router;
