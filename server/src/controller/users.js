const USERS = require('../constants/users');

function validateUser(req, res) {

    try {
        let email = req.body.email
        let password = req.body.password
    
        let user = USERS.find(user => {
            return user.email === email
        })
    
        if (user == null) {
            res.sendStatus(404)
        } else if (user.password != password) {
            res.sendStatus(401)
        } else if (user.password == password) {
            res.cookie('_user_session', JSON.stringify({email}))
            res.sendStatus(200)
        }
    } catch(err) {
        res.sendStatus(500)
    }
 }

module.exports = {validateUser};