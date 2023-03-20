var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { check, validationResult, body, param } = require('express-validator');


var userDB = require('./../utilities/userDB.js');
var userModel = require('./../models/User.js');

router.get('/', function (req, res) {
    res.render('signup', { userData: req.session.user, userInvite: req.session.invites });
});

module.exports = router;