var mongoose = require('mongoose');

var makeConn = require('../models/connection.js');

mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.error'));
db.once('open', function () {
    console.log('Connected to db!!');
});

var connectionSchema = new mongoose.Schema({
    connectionID: { type: String, required: true },
    connectionTopic: { type: String, required: true },
    connectionName: { type: String, required: true },
    host: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String },
    details: { type: String }
});

var connections = mongoose.model('Connection', connectionSchema);


var getConnections = async function () {
    var categories = [];
    var object = [];
    await connections.find().then(function (docs) {
        docs.forEach(function (doc) {
            var obj = new makeConn(doc);
            object.push(obj);
            var category = obj.connectionTopic;
            categories.push(category);
        });
    });
    let catConnections = {};
    categories.forEach(cat => {
        catConnections[cat] = object.filter(ob => ob.connectionTopic === cat);
    });
    return catConnections;
};

var getConnection = async function (id) {
    var data = null;
    await connections.find({ connectionID: id }).then(function (docs) {
        docs.forEach(function (doc) {
            var obj = new makeConn(doc);
            if (id === obj.connectionID) {
                data = obj;
            }
            else {
                data = null;
            }
        });
    });
    return data;
};

var getConnectionID = async function () {
    var count = await connections.countDocuments();
    var connecID = ('connection' + (count + 1));
    return connecID;
};

var getConnectionIDByTopicName = async function (topic, name) {
    var existingConn = await connections.find({ connectionTopic: topic, connectionName: name });
    return existingConn.connectionID;
};

var getAllCategories = async function () {
    var categories = [];
    var object = [];
    await connections.find().then(function (docs) {
        docs.forEach(function (doc) {
            var obj = new makeConn(doc);
            object.push(obj);
            var category = obj.connectionTopic;
            categories.push(category);
        });
    });

    return categories.filter((value, index) => categories.indexOf(value) === index);
};


var deleteConnection = async function (connectionID) {
    var result = '';
    await connections.deleteOne({ connectionID: connectionID }, function (err, res) {
        if (err) return handleError(err);
        console.log('Tournament is deleted from the db.');
        result = res.deletedCount;
    });
    return result;
};

module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
module.exports.getConnectionID = getConnectionID;
module.exports.getConnectionIDByTopicName = getConnectionIDByTopicName;
module.exports.getAllCategories = getAllCategories;
module.exports.deleteConnection = deleteConnection;