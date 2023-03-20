var mongoose = require('mongoose');

var userConn = require('./../models/UserConnection.js');
var connectionDB = require('./connectionDB.js');
var userProfile = require('./../models/UserProfile.js');
var connectionModel = require('./../models/connection.js');

var mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });


var userConnectionSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    connectionID: { type: String, required: true },
    rsvp: { type: String, required: true }
});


var userConnections = mongoose.model('userconnections', userConnectionSchema);

var conn = mongoose.model('Connection', connectionDB.connectionSchema);


var getAllConnections = async function (userID) {
    var connections = [];
    var connID = [];
    await userConnections.find({ userID: userID }).then(function (docs) {
        if (docs.length != 0) {
            docs.forEach(doc => {
                connections.push(doc);
            });
        }
    });
    return connections;
};

var AddUpdateRSVP = async function (userID, connectionID, rsvp) {
    await userConnections.find({ userID: userID, connectionID: connectionID }).then(function (doc) {
        if (doc.length != 0) {
            var opts = { runValidators: true };
            userConnections.updateOne({ userID: userID, connectionID: connectionID }, { $set: { rsvp: rsvp } }, opts, function (err, res) {
                if (err) return handleError(err);
            });
        } else {
            var add = new userConnections({ userID: userID, connectionID: connectionID, rsvp: rsvp });
            add.save(function (err) {
                if (err) return handleError(err);
            });
        }
    });
};

var deleteConnection = async function (userID, connectionID) {
    await userConnections.deleteOne({ userID: userID, connectionID: connectionID }, function (err, res) { //update the change in db
        if (err) return handleError(err);
        console.log('Tournament is removed. Number of connections deleted = ', res.deletedCount);
    });
};

var addNewConnection = async function (connection) {
    var connFind = [];
    await conn.find({ connectionID: connection.connectionID })
        .then(function (docs) {
            docs.forEach(doc => {
                connFind.push(doc);
            });
        });
    if (connFind.length == 0) {
        var newConn = new conn(connection);
        var result = '';
        await newConn.save(async function (err, res) {
            if (err) return handleError(err);
            result = await res;
            console.log('New tournament is added to db');
        });
    } else {
        await conn.updateOne({ connectionID: connection.connectionID }, { $set: { connectionTopic: connection.connectionTopic, connectionName: connection.connectionName, host: connection.host, date: connection.date, startTime: connection.startTime, endTime: connection.endTime, location: connection.location, details: connection.details } }, function (err, res) {
            if (err) return handleError(err);
            result = res;
            console.log('updated the existing connection');
        });
    }
    return result;
};


function handleError(error) {
    console.error("One or more of the required fields are left blank");
}

var getNumUsers = async function (connectionID) {
    var result = '';
    await userConnections.find({ connectionID: connectionID }).then(function (docs) {
        docs.forEach((doc) => {
            console.log('document details = ', doc);
        })
        result = docs.length;
    });
    return result;
};

var getUsersConnection = async function (connectionID) {
    var result = [];
    await userConnections.find({ connectionID: connectionID }).then(function (docs) {
        docs.forEach((doc) => {
            result.push(doc.userID);
        })
    })
    return result;
};

module.exports.getAllConnections = getAllConnections;
module.exports.AddUpdateRSVP = AddUpdateRSVP;
module.exports.addNewConnection = addNewConnection;
module.exports.deleteConnection = deleteConnection;
module.exports.getNumUsers = getNumUsers;
module.exports.getUsersConnection = getUsersConnection;