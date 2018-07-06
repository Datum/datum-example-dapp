import Datum from 'datum-sdk';
import Web3Factory from './Web3Factory'
const web3 = Web3Factory.getInstance();
const axios = require('axios');

export default class DatumApi{
static datum= new Datum();

static init(account){
    this.datum.initialize({
    privateKey : account.privateKey,
   developerPublicKey : account.publicKey
 });
}

static createIdentity(){
  return Datum.createIdentity();
}
static async getDepositBalance(address){
  let contractBalance = await Datum.getDepositBalance(address);
  return parseFloat(web3.utils.fromWei(contractBalance,'ether')).toFixed(4);
}
static async getBalance(address){
  let balanceInWei = await Datum.getBalance(address);
  return parseFloat(web3.utils.fromWei(balanceInWei,'ether')).toFixed(4);
}


  static getDatFromFaucet(address){
  return new Promise(function(resolve, reject) {
    axios.get(`https://faucet.megatron.datum.org/v1/faucet/dat/${address}`)
    .then((res)=>{
      resolve(res.data.txHash)
    }).catch((err)=>{
      reject(err.response.data.msg);
    });
  });
  }

  static depositToContract(dats){
    return this.datum.deposit(dats);
  }
  static withdrawFromContract(dats){
    return new Promise((resolve, reject)=> {
      this.datum.withdrawal(dats).on('transaction',(txHash)=>{
        resolve(txHash);
      }).catch((err)=>{
        reject(err);
      })
    });
  }
  static async getTransactionStatus(txHash){
    console.log(`Checking transaction : ${txHash}`);
    let txObj= await web3.eth.getTransactionReceipt(txHash);
    console.log(txObj);
    return {
      pending: (txObj===null),
      failed: (txObj!==null && (txObj.status==='0x0'||!txObj.status)),
      success: (txObj!==null&& (txObj.status==='0x1'||txObj.status))
    }
  }
}
