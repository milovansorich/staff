var express = require('express');
var router = express.Router();
const jobPostingsService = require("@services/job_postings.js");


/* GET home page. */
router.get('/', async function(req, res, next) {
  const jobs = await jobPostingsService.findJobPostingByState('A');
  if(req.session.role != 'staff'){
    res.render('index', { user: req.session.user, role: req.session.role, jobs: jobs });
  }else{
    res.redirect('/replacement')
  }
});

module.exports = router;
