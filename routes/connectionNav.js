var express = require('express');
var router = express.Router();
const { check, validationResult, body, param } = require('express-validator');

var connectionDB = require('./../utilities/connectionDB.js');
var userDB = require('./../utilities/userDB.js');
var userProfileDB = require('./../utilities/UserProfileDB.js');

var userModel = require('./../models/User.js');
var userProfile = require('./../models/UserProfile.js');
var userConnection = require('./../models/UserConnection.js');

router.get('/', async function (req, res) {
    var connections = await connectionDB.getConnections();

    res.render('connections', { connections: connections, userData: req.session.user, userInvite: req.session.invites });
});

router.get('/connection/:connectionID',
    [param('connectionID') //validate the connection ID
        .isLength({ min: 11 })
        .isLength({ max: 12 })
        .matches(/^[connection\d]*$/, 'g').withMessage("Invalid connection ID passed. Please select a valid connection from the list.")
    ],
    async function (req, res) {
        var numPeople = await userProfileDB.getNumUsers(req.params.connectionID);
        var connection = await connectionDB.getConnection(req.params.connectionID); //call to connectionDB function to fetch data from the db
        if (connection) {
            var stH = connection.startTime.substring(0, 2);
            if (parseInt(stH) >= 12) {
                stH = parseInt(stH) - 12;
                if (stH == 0) {
                    stH = '12';
                } else if (stH < 10) {
                    stH = '0' + stH;
                }
                connection.startTime = stH + ':' + connection.startTime.substring(3, 5) + 'PM';
            } else if (connection.startTime.substring(5, 7) != '') {
                connection.startTime = connection.startTime.substring(0, 2) + ':' + connection.startTime.substring(3, 5) + connection.startTime.substring(5, 7);
            } else {
                connection.startTime = connection.startTime.substring(0, 2) + ':' + connection.startTime.substring(3, 5) + 'AM';
            }
            var etH = connection.endTime.substring(0, 2);
            if (parseInt(etH) >= 12) {
                etH = parseInt(etH) - 12;
                if (etH == 0) {
                    etH = '12';
                } else if (etH < 10) {
                    etH = '0' + etH;
                }
                connection.endTime = etH + ':' + connection.endTime.substring(3, 5) + 'PM';
            } else if (connection.endTime.substring(5, 7) != '') {
                connection.endTime = connection.endTime.substring(0, 2) + ':' + connection.endTime.substring(3, 5) + connection.endTime.substring(5, 7);
            } else {
                connection.endTime = connection.endTime.substring(0, 2) + ':' + connection.endTime.substring(3, 5) + 'AM';
            }
            res.render('connection', { connection: connection, userData: req.session.user, numPeople: numPeople });
        } else {                                                       //to handle the page if incorrect connection ID is provided in the URL
            var connections = await connectionDB.getConnections();
            if (connection != null) {
                res.render('connections', { connections: connections, userData: req.session.user, userInvite: req.session.invites });
            } else {
                const errors = validationResult(req);
                res.render('connections', { connections: connections, userData: req.session.user, err: errors, userInvite: req.session.invites });
            }
        }
    });


router.get('/*', async function (req, res) {
    var connections = await connectionDB.getConnections();
    res.render('connections', { connections: connections, userData: req.session.user, userInvite: req.session.invites });
});

module.exports = router;