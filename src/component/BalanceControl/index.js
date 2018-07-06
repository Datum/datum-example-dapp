import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DatumApi from '../../lib/DatumApi';
import Grid from '@material-ui/core/Grid';
import BalanceViewer from './BalanceViewer.js';
import TransactionForm from'./TransactionForm';

export default class BalanceControl extends Component{
state={
  contractBalance:0,
  accountBalance:0,
  value:0
}

  depositToContract(dats){
    return new Promise(function(resolve, reject) {
      DatumApi.depositToContract(dats).on('transaction',(txHash)=>{
        resolve(txHash);
      }).catch((err)=>{
        reject(err);
      });
    });
  }
  withdrawFromContract(dats){
    return DatumApi.withdrawFromContract(dats);
  }
 getDatFromFaucet(){
   console.log(this.props.account);
     let address = this.props.account.address;
    return DatumApi.getDatFromFaucet(address);
  }

  async updateBalances(){
    let tmpBalances={};
    // let tmpContractBalance = await DatumApi.getBalance(this.props.contractAddress);
    let tmpContractBalance = await DatumApi.getDepositBalance(this.props.account.address);
    let tmpAccountBalance  = await DatumApi.getBalance(this.props.account.address);

    let shouldUpdateAccountBalance = typeof(tmpAccountBalance)!=='undefined' && (tmpAccountBalance!==this.state.accountBalance);
    let shouldUpdateContractBalance =typeof(tmpContractBalance)!=='undefined' && tmpContractBalance!==this.state.contractBalance;

    if(shouldUpdateAccountBalance||shouldUpdateContractBalance){
      tmpBalances = shouldUpdateAccountBalance?{accountBalance:tmpAccountBalance}:{};
      tmpBalances = shouldUpdateContractBalance?{...tmpBalances,contractBalance:tmpContractBalance}:{...tmpBalances};
    }
    if(Object.keys(tmpBalances).length>0){
      this.setState({...this.state,...tmpBalances});
    }
  }

  handleChange(event,value){
    this.setState({...this.state,value:value});
  }

  render(){
    this.updateBalances();
    return(
      <Grid container spacing={24} style={{padding:20}}>

          <BalanceViewer lbl="Account Balance" balance={this.state.accountBalance}/>
          <BalanceViewer lbl="Storage Contract Balance" balance={this.state.contractBalance}/>

        <Grid item xs={12}>
          <AppBar position='static'>
            <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
              <Tab label="Get DAT Tokens"></Tab>
              <Tab label="Deposit To Contract"></Tab>
              <Tab label="Withdraw From Contract"></Tab>
            </Tabs>
          </AppBar>
          {this.state.value===0 &&
            <TransactionForm  btnTxt="Submit" onSuccess={this.updateBalances.bind(this)} action={this.getDatFromFaucet.bind(this)}/>
          }
          {this.state.value===1 &&
            <TransactionForm  btnTxt="Submit" onSuccess={this.updateBalances.bind(this)} action={this.depositToContract.bind(this)} enableInput={true}/>
          }
          {this.state.value===2 &&
            <TransactionForm  btnTxt="Submit" onSuccess={this.updateBalances.bind(this)} action={this.withdrawFromContract.bind(this)} enableInput={true}/>
          }
        </Grid>
      </Grid>
    );
  }
}
