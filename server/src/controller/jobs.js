const e = require('express');
const {OPEN_JOBS} = require('../constants/jobs');
const USERS = require('../constants/users');

function findUsersJobs (req, res) {
    try {
        let cookie = req.headers.cookie;

        if (cookie == null)
            res.sendStatus(401).end()
    
        let email = cookie.split('_user_session=')[1].split(';')[0]  
        email = JSON.parse(decodeURIComponent(email)).email
    
        let user = USERS.find(user => {
            return user.email === email
        })
    
        if (user == null) {
            res.sendStatus(401).end()
        } else {
            let allUserJobs = []
            user.departments.forEach(userDept => {
                OPEN_JOBS.forEach(openJob => {
                    if (openJob.department == userDept) {
                        allUserJobs.push(openJob)
                    }
                })
            })
    
            res.status(200).send(JSON.stringify({jobs : allUserJobs}))
        }
    } catch (err) {
        res.status(500).end()
    }
}

module.exports = {findUsersJobs}