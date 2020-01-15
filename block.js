const { SHA256 } = require("crypto-js")

class Block {
	constructor(data, index, timestamp=String(new Date()), prevhash){
		this.data = data;
		this.index = index;
		this.timestamp = timestamp;
		this.prevhash = prevhash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	mineblk(diffclty) {
		while (this.hash.substring(0,diffclty) !== Array(diffclty+1).join('0')) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log(`Block ${this.index+1} mined: ${this.hash}`)

	}

	calculateHash() {
		return SHA256(JSON.stringify(this.data)+this.index+this.timestamp+this.prevhash+this.nonce).toString();
	}

}

module.exports = Block;
