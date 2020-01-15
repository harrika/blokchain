const Block = require('./block');

class Blockchain {
	constructor() {
		this.chain = [this.createGenesis()];
	}

	createGenesis(){
		const genDate = '01/01/2020';
		let nn = new Block('genesis block', 0, genDate,'0');
		nn.hash = nn.calculateHash();
		return nn
	}
	getLast() {
		return this.chain[this.chain.length -1];
	}

	addNew(newblk) {
		newblk.prevhash = this.getLast().hash;
		newblk.index = this.getLast().index+1;
		newblk.hash = newblk.calculateHash();
		this.chain.push(newblk);
	}

	isValid(){
		const chain= this.chain;
		for (let i=0; i<chain.length; i++) {
			if (chain[i].hash !== chain[i].calculateHash()) {
				console.log('block', i, ' HASH integrity FAILED!');
				console.log(chain[i]);
				console.log("hash calculated: ",chain[i].calculateHash())
				return false;
			}
			if (i>0 && chain[i].prevhash !== chain[i-1].hash) {
				console.log('prevhash integrity check failed', i);
				return false;
		
			}
		}
		console.log("Block and prev-hash integrities passed");
		return true;
	}
}

let blocks2add = 7000;
const polychain = new Blockchain();

for (i=0; i<blocks2add; i++) {
	polychain.addNew(new Block({sender: "polychain", reciver: "tube", message: `block ${polychain.chain.length} added`}));
}

polychain.chain.forEach((blk) => {
	console.log(blk);
});

// inserting alien data to test validity check
// polychain.chain[400].data = "this is different now is it?"


polychain.isValid();

