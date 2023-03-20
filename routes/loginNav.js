var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('login', { userData: req.session.user, userInvite: req.session.invites });
});

module.exports = router;