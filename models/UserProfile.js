var uc = require('./../models/UserConnection.js');
var connectionDB = require('./../utilities/connectionDB.js');
var userProfileDB = require('./../utilities/UserProfileDB.js');

var userConnec;
var connections = [];
var checkList = [];

class userProfile {
    constructor(userID, connections) {
        this.userID = userID;
        this.connections = connections;
    }

    async addConnection(connectionID, rsvpVal) {
        var connection = await connectionDB.getConnection(connectionID);
        var userConnec = new uc(connection, rsvpVal);
        this.connections.push(userConnec);
        return this;
    }

    removeConnection(connectionID) {
        for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i].connection.connectionID === connectionID) {
                var rem = this.connections.splice(i, 1);
                return this;
            }
        }
    }

    updateRSVP(connectionID, rsvpVal) {
        for (var j = 0; j < this.connections.length; j++) {
            if (this.connections[j].connection.connectionID === connectionID) {
                this.connections[j].rsvp = rsvpVal;
            }
        }
        return this;
    }

    emptySession() {
        this.userID = '';
        this.connections = [];

        return this;
    }

    getUserConnections() {
        return this.connections;
    }

    getUserDetails() {
        return {
            userID: this.userID,
        }
    }
};

module.exports = userProfile;