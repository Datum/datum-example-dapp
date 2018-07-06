
import React,{Component} from 'react';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment'
import TransactionStatus from '../TransactionStatus';


export default class TransactionForm extends Component{

  style={
    margin:'10px'
  }

  state={
    dat:0,
    txHash:'',
    errorMsg:'',
    disableBtn:false,
    showError:false
  }

  resetState(){
    this.setState({txHash:'',err:'',disableBtn:false});
  }

  handleDatInputChange(event){
    this.setState({...this.state,dat:event.target.value,disableBtn:!(event.target.value>0)});
  }

  componentDidMount(){
    if(this.props.enableInput)
    this.state.dat>0?this.setState({...this.state,disableBtn:false}):this.setState({...this.state,disableBtn:true});
  }

  handleBtnClicked(){
      this.props.action(this.state.dat).then((trxHash)=>{
        //TODO:validate txHash to inforce promise return value.
        console.log('Response...',trxHash);
        this.setState({...this.state,...{txHash:trxHash,showError:false,errorMsg:''}})
      }).catch((err)=>{
        console.error('ERROR while performing action',JSON.stringify(err));
        this.setState({...this.state,...{showError:true,errorMsg:this.getErrorMsg(err)}})
      });
    }
    getErrorMsg(err){
      if(typeof(err)==='object'&&typeof(err.message)!=='undefined'){
        return err.message;
      }else if(typeof(err)==='string'&&err.length>0){
        return err
      }
      return this.state.errorMsg;
    }
  render(){
    return(
      <Card>
        <CardContent>
            <div>
              <div style={this.style}>
              <TransactionStatus txHash={this.state.txHash} onSuccess={this.props.onSuccess} showError={this.state.showError} errorMsg={this.state.errorMsg}/>
              </div>
              {this.state.txHash&&
                <div style={this.style}>
                  <InputLabel>Transaction Hash: {this.state.txHash}</InputLabel>
                </div>
              }
            </div>

          {this.props.enableInput&&
            <div style={this.style}>
              <Input style={{minWidth:'60%'}}
                type='number'
               onChange={this.handleDatInputChange.bind(this)}
               id="dat-input"
                value={this.state.dat}
                endAdornment={<InputAdornment position="end">DAT</InputAdornment>}/>
            </div>
          }
          <Button onClick={this.handleBtnClicked.bind(this)} style={{minWidth:'100%'}}  variant="contained" disabled={this.state.disableBtn}>
            {this.props.btnTxt}
          </Button>
        </CardContent>
      </Card>
    );
  }
}
