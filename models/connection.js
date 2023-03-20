class connection {
    constructor(data) {
        this.connectionID = data.connectionID;
        this.connectionTopic = data.connectionTopic;
        this.connectionName = data.connectionName;
        this.host = data.host;
        this.date = data.date;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.location = data.location;
        this.details = data.details;
    }

    getcID() {
        return this.connectionID;
    }
    setcID(cid) {
        this.connectionID = cid;
    }

    getcTopic() {
        return this.connectionTopic;
    }
    setcTopic(ct) {
        this.connectionTopic = ct;
    }

    getcName() {
        return this.connectionName;
    }
    setcName(cn) {
        this.connectionName = cn;
    }

    gethst() {
        return this.host;
    }
    sethst(ht) {
        this.host = ht;
    }

    getdte() {
        return this.date;
    }
    setdte(dt) {
        this.date = dt;
    }

    getsTim() {
        return this.startTime;
    }
    setsTim(sTm) {
        this.startTime = sTm;
    }

    geteTim() {
        return this.endTime;
    }
    seteTim(eTm) {
        this.endTime = eTm;
    }

    getloc() {
        return this.location;
    }
    setloc(lc) {
        this.location = lc;
    }

    getdls() {
        return this.details;
    }
    setdls(cd) {
        this.details = cd;
    }

};

module.exports = connection;

