'use strict'

class Session {
	constructor() {
		this.sessionId = `${this.getRandom()}-${new Date().getTime().toString(36)}-${this.getRandom()}`;
	}
	
	toString(){
		return this.sessionId;
	};
	
	getTime(){
		return parseInt(this.sessionId.split('-')[1], 36);
	};
	//乱数発生
	getRandom(){
		return Math.floor(Math.random() * 1e16).toString(36);
	}
}
module.exports = Session;