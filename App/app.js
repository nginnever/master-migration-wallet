'use strict'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const crypto = require('crypto')

const walletAbi = require('../abi.js').wallet
const tokenAbi = require('../abi.js').token
const walletAddress = '0x38242c82478117e94147d140507866dd063d063c'
const tokenAddress = '0x38242c82478117e94147d140507866dd063d063c'

function App(shard) {
  this.tokenBalance;
}

App.prototype.getTokenBalance = function(cb) {
  var walletInst = getWallet(walletAddress)
  var tokenInst = getToken(tokenAddress)

  try{
    self.tokenBalance = tokenInst.balances('')
    inst.merkleAudit(this.shard.chunks[ind], '0x'+this.shard.root, proof, {from: web3.eth.accounts[0], gas:3000000}, (err, res) => {
      console.log(err)
    })
  }catch(e){}
  

  var events = inst.allEvents()
  events.watch(function(error, event){
    if (error) {
      console.log("Error: " + error);
    } else {

      console.log(event.event + ": " + JSON.stringify(event.args));
    }
  })
  return cb(balance)
}

App.prototype.getWalletBalance = function(callback){
   let b
    try{
      b = web3.eth.getBalance(web3.eth.accounts[0])
    }catch(e){}
    return callback(b)
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

function generateTree(shard, leaves) {
  var temp = []
  var d = 0

  if(leaves.length === 1) {
    shard.nodes.push({ data: { id: leaves[0], trim: leaves[0], align:'top', color: '#11479e' } })
    shard.root = leaves[0]
    return 
  }

  for(var i = 0; i < leaves.length; i+=2) {
    // if(shard.preImage === false){
    //   shard.nodes.push({ data: { id: i, trim: i, align:'bottom', color: '#e6e600'} })
    //   shard.nodes.push({ data: { id: i+1, trim: i+1, align:'bottom', color: '#e6e600'} })
    //   shard.edges.push({ data: { source: leaves[i], target: i } })
    //   shard.edges.push({ data: { source: leaves[i+1], target: i+1 } })
    // }

    //shard.nodes.push({ data: { id: leaves[i], trim: leaves[i].substring(0,4)+'...', align:'top', color: '#11479e'} })
    //shard.nodes.push({ data: { id: leaves[i+1], trim: leaves[i+1].substring(0,4)+'...', align:'top', color: '#11479e'} })
    
    var tempHash = sha3Hex(leaves[i]+leaves[i+1])
    // var tempHash = new SHA3.SHA3Hash(256)

    // tempHash.update(leaves[i])
    // tempHash.update(leaves[i+1])
    // tempHash = tempHash.digest('hex')

    //shard.edges.push({ data: { source: tempHash, target: leaves[i] } })
    //shard.edges.push({ data: { source: tempHash, target: leaves[i+1] } })

    temp.push(tempHash)
  }

  //shard.preImage = true
  shard.levels.push(temp)
  return generateTree(shard, temp)
}

function _nextPowerOfTwo(input) {
  var x = 0
  while(input > Math.pow(2, x)) {
    x++
  }
  return x
}

function getContract (addy) {
  var contract = web3.eth.contract(abiContract)
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
