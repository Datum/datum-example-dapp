import Web3 from 'web3'
const END_POINT='https://node-us-west.datum.org/api';

/**
 * Singleton web3 factory
 */
export default class Web3Factory{
  static getInstance(endPoint){
    if(!Web3Factory.instance){
      let tmpEP = typeof(endPoint)!=='undefined'?endPoint:END_POINT;
      Web3Factory.instance=new Web3(tmpEP);
      this.instance.utils=Web3.utils;
      return this.instance;
    }else{
      return this.instance;
    }
  }

}
