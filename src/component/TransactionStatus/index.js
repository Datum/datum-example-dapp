import React, {Component} from 'react';
import DatumApi from '../../lib/DatumApi';
import InputLabel from '@material-ui/core/InputLabel';

const DEFAULT_STATUS={pending:false,success:false,failed:false};
const DEFAULT_STATE = {
  status:{...DEFAULT_STATUS},
  pendingMsg:'Pending',
  errorMsg:'Error, Transaction failed',
  successMsg:'Success',
  statusDiv:''
}

export default class TransactionStatus extends Component{
  timeoutRefs=[];
  style={
    margin:'10px'
  }

  state={...DEFAULT_STATE}

  clearTimeouts(){
    this.timeoutRefs.map(ref=>clearTimeout(ref));
  }

  onPending(txHash){
    console.log('Pending');
    this.checkStatus(txHash);
    this.setState({...this.state,statusDiv:this.getDiv('orange','Pending')})
    if(typeof(this.props.onPending)!=='undefined'){
      this.props.onPending()
    }
  }
  onSuccess(){
    this.setState({...this.state,statusDiv:this.getDiv('green','Success!')})
    console.log('success');
    this.clearTimeouts();
    if(typeof(this.props.onSuccess)!=='undefined'){
      this.props.onSuccess();
    }
  }
  getErrorMsg(err){
    if(typeof(err)==='object'&&typeof(err.message)!=='undefined'){
      return err.message;
    }else if(typeof(err)==='string'&&err.length>0){
      return err
    }
    return this.state.errorMsg;
  }
  onFail(err){
    console.error(err);
    this.setState({...this.state,statusDiv:this.getDiv('red','failed',this.getErrorMsg(err))})
    this.clearTimeouts();
    console.log('fail');
  }
  componentWillUnmount(){
    this.clearTimeouts();
  }

  checkStatus(txHash){
    let ref = setTimeout(()=>{
      DatumApi.getTransactionStatus(txHash).then((res)=>{
        console.log('Status Response:',res);
        this.setState({...this.state,status:{...res}});
        if(res.pending){
          this.onPending(txHash);
        } else if(res.success){
          this.onSuccess(txHash);
        }else if(res.failed){
          this.onFail(this.state.errorMsg);
        }
      }).catch((err)=>{
        this.onFail(err);
      })
    },2000)
    this.timeoutRefs.push(ref);
  }

  getDiv(color,statusMsg,errorMsg){
    return (
      <div>
        {this.getStatusDiv(color,statusMsg)}
        {(typeof(errorMsg)!=='undefined'&&errorMsg.length>0)&&
          <div style={this.style}>
            <InputLabel>Error:<span style={{color:'red'}}>{errorMsg}</span></InputLabel>
          </div>
        }
      </div>
    );
  }
  getStatusDiv(color,msg){
    return(
      <div style={this.style}>
        <InputLabel>Transaction Status:<span style={{color:color}}>{msg}</span></InputLabel>
      </div>
    )
  }
  shouldComponentUpdate(nextProps,nextState){
    if(typeof(nextProps.txHash)!=='undefined'&&this.props.txHash!==nextProps.txHash){
      this.setState({...DEFAULT_STATE});
      this.clearTimeouts();
      this.checkStatus(nextProps.txHash);
      if(typeof(this.props.timeout)!=='undefined'){
        setTimeout(()=>{this.clearTimeouts();},this.props.timeout);
      }
      return true;
    }

    return true;
  }
  render(){
    if(this.props.showError===true){
      let errorMsg=typeof(this.props.errorMsg)!=='undefined'?this.props.errorMsg:this.state.errorMsg;
      let errDiv = this.getDiv('red','Failed',errorMsg);
      return(errDiv)
    }else if(this.props.txHash===null||typeof(this.props.txHash)==='undefined'||this.props.txHash.length===0){
      return null;
    }
    else{
      return(this.state.statusDiv)
    }

  }

}
