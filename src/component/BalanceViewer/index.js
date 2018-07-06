import React, {Component} from 'react';
import DatumApi from '../../lib/DatumApi';
export default class BalanceViewer extends Component {
  state = {
    balance:undefined
  };

  async fetchBalance() {
    let balance = await DatumApi.getBalance(this.props.address);
    this.setState({balance:balance});
  }

  isValidAddress(address) {
    return typeof(address) !== 'undefined' && address !== null && address.length !== 0
  }

  componentDidUpdate(prevProps){
    if(this.isValidAddress(this.props.address)&&prevProps.address!==this.props.address){
      this.fetchBalance();
    }
  }

  componentDidMount(){
    if(this.isValidAddress(this.props.address)&&this.state.balance==undefined){
      this.fetchBalance();
    }
  }

  render() {
    if (this.isValidAddress(this.props.address)) {
      return (<div>
        <p>{this.props.txt} {this.state.balance} DAT</p>
      </div>);
    } else {
      return (<div></div>);
    }
  }
}
