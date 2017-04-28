'use strict'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const walletAbi = require('./abi.js').wallet
const tokenAbi = require('./abi.js').token
const walletAddress = '0x23e44f57f1ba0a0dc1cbda70978caace94c84f0a'
const tokenAddress = '0xf834a98ef136c912a38b48559cc8bbba7869d0c3'

function App(shard) {
  this.wallet = getContract(walletAddress, walletAbi)
  this.token = getContract(tokenAddress, tokenAbi)
  this.tokenBalance = 0
}

App.prototype.getTokenBalance = function(cb) {
  var self = this
  try{
    self.tokenBalance = self.token.balanceOf(walletAddress)
    return cb(self.tokenBalance)
  }catch(e){
    return cb(e)
  }
}

App.prototype.getOwners = function(callback){
  var self = this
  var o = []
  try{
    o.push(self.wallet.owners(0))
    o.push(self.wallet.owners(1))
    return callback(o)
  }catch(e){
    return callback(e)
  }
}

App.prototype.confirm = function(tx, callback){
  var self = this
  let c
  try{
    c = self.wallet.confirmTransaction(tx, {from:web3.eth.accounts[0], gas:1000000})
  }catch(e){
    return callback(e)
  }
  var events = self.wallet.allEvents()
  events.watch(function(error, event){
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log('++++++++')
      console.log(event.event + ": " + JSON.stringify(event.args));
      console.log('++++++++')
      return callback(c)
    }
  })
}

App.prototype.getConfirms = function(tx, callback){
  var self = this
  var c = 0
  try{
    c = self.wallet.confirmationCount(tx)
    return callback(c.c[0])
  }catch(e){
    return callback(e)
  }
}

App.prototype.sendTokens = function(to, amt, callback){
  var self = this
  let s
  try{
    var data = self.token.transfer.getData(to, amt)
    console.log(data)
    var nonce = Math.floor((Math.random() * 100000) + 1);
    console.log(nonce)
    s = self.wallet.submitTransaction(to, amt, data, '0x'+nonce, {from:web3.eth.accounts[0], gas:1000000})
    console.log(s)
  }catch(e){
    return callback(e)
  }
  var events = self.wallet.allEvents()
  events.watch(function(error, event){
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log('++++++++')
      console.log(event.event + ": " + JSON.stringify(event.args));
      console.log('++++++++')
      return callback(s)
    }
  })
}




function verify(data) {
  var temp;
  var d = new SHA3.SHA3Hash(256)
  temp = d.update(data).digest('hex')

  for(var i=0; i<proof.length; i++){
    var d = new SHA3.SHA3Hash(256)
    temp = d.update(temp).update(proof[i]).digest('hex')
  }
  return temp
}

function _nextPowerOfTwo(input) {
  var x = 0
  while(input > Math.pow(2, x)) {
    x++
  }
  return x
}

function getContract (addy, _abi) {
  var contract = web3.eth.contract(_abi)
  var inst = contract.at(addy)
  return inst
}

var decodeHex = function(s) {
  var o = [];
  var alpha = '0123456789abcdef';
  for (var i = (s.substr(0, 2) == '0x' ? 2 : 0); i < s.length; i += 2) {
    var index1 = alpha.indexOf(s[i]);
    var index2 = alpha.indexOf(s[i + 1]);
    if (index1 < 0 || index2 < 0)
      throw("Bad input to hex decoding: " + s + " " + i + " " + index1 + " " + index2)
    o.push(index1 * 16 + index2);
  }
  return o;
}

module.exports = App
