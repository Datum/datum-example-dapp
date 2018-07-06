import React, {Component} from 'react';
import DatumApi from './lib/DatumApi'
import BalanceControl from './component/BalanceControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountManager from './component/AccountManager';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto'

class App extends Component {

  state = {
    showControls:false,
    account:{
      address:undefined,
      privateKey:undefined,
      publicKey:undefined
    },
    contractAddress:'0xa810ae43fe544bb486d76335dc76220573f3c744'
  }


  updateAccount(accountObj){
    this.setState({account:accountObj,showControls:true});
    DatumApi.init(accountObj);
  }

  render(){
    return (
    <div style={{padding:20}}>
      <CssBaseline/>
        <Typography variant="headline" gutterBottom>
          Datum-SDK Demo running on Datum Megatron Test Network, full source code is available <a href="https://github.com/Datum/datum-example-dapp">here</a>
        </Typography>
      <AccountManager next={this.updateAccount.bind(this)}/>
      {this.state.showControls&&
        <div>
          <BalanceControl account={this.state.account} contractAddress={this.state.contractAddress}/>
        </div>}
    </div>
    )
  }
}
export default App;
