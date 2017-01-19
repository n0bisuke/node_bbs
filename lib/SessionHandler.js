'use strict'

const Session = require('./Session');

class SessionHandler {
	constructor(cookieName = 'SESSION', maxAge, checkInterval = 1000) {
		this.cookieName = cookieName;
		this.maxAge = maxAge ? maxAge * 1000 : 600000; //10 minutes
		this.checkInterval = checkInterval; //default 1 sec.
		this.sessions = [];

		setInterval(() => {
			let now = new Date().getTime();
			for (let key in this.sessions) {
				let session = this.sessions[key];
				if (session.doDestroy) delete this.sessions[key];
				if (now - session.getTime() > maxAge) delete this.sessions[key];
			}
		}, checkInterval);
	}

	deleteSession(session) {
        if (this.sessions[session]) {
            delete this.sessions[session];
            return true;
        }
        return false;
    }

	getSession(req, res){
		let cookie = req.headers.cookie;
		if (cookie && cookie.indexOf(this.cookieName) !== -1) { //cookie found
			let start = cookie.indexOf(this.cookieName) + this.cookieName.length + 1;
			let end = cookie.indexOf('; ', start);
			end = end === -1 ? cookie.length : end;
			let value = cookie.substring(start, end);

			// let regexp = new RegExp(`${this.cookieName}=(.*?); `,'i');
			// let value = cookie.match(regexp) ? cookie.match(regexp)[1] : '';

			if (this.sessions[value]) {
				return this.sessions[value];
			}
		}

		let session = new Session();
		res.setHeader('Set-Cookie', [`${this.cookieName}=${session};Max-Age=${this.maxAge / 1000}`]);
		this.sessions[session] = session;
		return this.sessions[session] = session;
	}

}

module.exports = SessionHandler;