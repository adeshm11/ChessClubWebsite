var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { userData: req.session.user, userInvite: req.session.invites });
});


module.exports = router;