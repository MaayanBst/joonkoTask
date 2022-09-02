const express = require('express');
const {OPEN_JOBS} = require('../constants/jobs');
const USERS = require('../constants/users');
const usersController = require('../controller/users')
const jobsController = require('../controller/jobs')
const router = express.Router();

router.post("/login", usersController.validateUser)
router.get("/jobs", jobsController.findUsersJobs)

module.exports = router;