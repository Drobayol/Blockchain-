class Block {
    constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }
  
    calculateHash() {
      const crypto = require('crypto');
      return crypto
        .createHash('sha256')
        .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
        .digest('hex');
    }
  }
  
  class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    createGenesisBlock() {
      return new Block(0, new Date().toISOString(), 'Genesis Block', '0');
    }
  
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  
    isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
        if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      return true;
    }
  }
  
  module.exports = Blockchain;
  