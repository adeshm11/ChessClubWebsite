var bcrypt = require('bcryptjs');

var userModel = require('./../models/User.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailID: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
    try {
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

var users = mongoose.model('users', userSchema);


var addNewUser = async function (userData) {
    var result = '';
    var nUsr = [];
    await users.find({ userID: userData.userID }).then(function (docs) {
        docs.forEach(doc => {
            nUsr.push(doc);
        })
        if (nUsr.length == 0) {
            var newUser = new users({ userID: userData.userID, firstName: userData.firstName, lastName: userData.lastName, emailID: userData.emailID, password: userData.password });
            newUser.save(function (err, res) {
                if (err) return handleError(err);
                result = res;
                console.log('New user is added to db');
                return result;
            });
        }
        else {
            console.log('Username already exists in the db');
            return result;
        }
    });
}


var getUser = async function (userID) {
    var result = '';
    await users.find({ userID: userID }).then(function (docs) {
        docs.forEach(doc => {
            result = new userModel(doc.userID, doc.firstName, doc.lastName, doc.emailID, doc.password);
        })
    });
    return result;
};

var getAllUsers = async function () {
    var result = [];
    await users.find({}).then(function (docs) {
        docs.forEach(doc => {
            result.push(doc);
        })
    });
    return result;
};

var checkIfEmailUnique = async function (email) {
    var result = [];
    await users.findOne({ emailID: email }).then(function (docs) {
        result.push(docs);
    });
    if (result.length !== 0) {
        return true;
    } else {
        return false;
    }
};

function handleError(error) {
    console.log(error);
    console.error("One or more of the required fields are left blank");
    process.exit();
}

module.exports.getUser = getUser;
module.exports.addNewUser = addNewUser;
module.exports.getAllUsers = getAllUsers;
module.exports.checkIfEmailUnique = checkIfEmailUnique;