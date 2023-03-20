
class User {
    constructor(userID, firstName, lastName, email, password) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailID = email;
        this.password = password;
    }

    getuID() {
        return this.userID;
    }
    setuID(uid) {
        this.userID = uid;
    }

    getfname() {
        return this.firstName;
    }
    setfname(fn) {
        this.firstName = fn;
    }

    getlname() {
        return this.lastName;
    }
    setlname(ln) {
        this.lastName = ln;
    }

    getemail() {
        return this.emailID;
    }
    setemail(eml) {
        this.emailID = eml;
    }

    getpswd() {
        return this.password;
    }
    setpswd(pswd) {
        this.password = pswd;
    }

    getUserDetails() {
        return {
            userID: this.userID,
            firstName: this.firstName,
            lastName: this.lastName,
            emailID: this.emailID,
            password: this.password
        };
    }
};

module.exports = User;