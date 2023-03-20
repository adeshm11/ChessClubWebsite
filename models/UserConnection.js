class UserConnection {
    constructor(connection, rsvp) {
        this.connection = connection;
        this.rsvp = rsvp;
    }

    getconn() {
        return this.connection;
    }
    setconn(conn) {
        this.connection = conn;
    }

    getrsvpRes() {
        return this.rsvp;
    }
    setrsvpRes(res) {
        this.rsvp = res;
    }
};

module.exports = UserConnection;