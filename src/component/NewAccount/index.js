import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DatumApi from '../../lib/DatumApi';
import CopyToClipboard from 'react-copy-to-clipboard'
import TextField from '@material-ui/core/TextField';
export default class NewAccount extends Component{

state={
  privateKey:'',
  publicKey:'',
  address:''
}
generateID(){
  this.setState(DatumApi.createIdentity());
}

render(){

  return (
    <div>
      <Card style={{margin:'5PX', padding:20}}>
        <TextField style={{'minWidth':'100%'}}  label='Public Key' margin='normal'  value={this.state.publicKey} disabled/>
        <TextField style={{'minWidth':'100%'}}  label='Private Key' margin='normal'  value={this.state.privateKey} disabled/>
        <TextField style={{'minWidth':'100%'}}  label='Address' margin='normal'  value={this.state.address} disabled/>
        <br/><br/><Button  margin ="normal" variant="contained" color="primary" onClick={this.generateID.bind(this)}>Generate New Account</Button>
          <CopyToClipboard text={JSON.stringify(this.state)}>
              <Button style={{marginLeft:8}}>Copy to clipboard</Button>
            </CopyToClipboard>
            <CopyToClipboard text={this.state.privateKey}>
                <Button style={{marginLeft:8}}>Copy Private Key to clipboard</Button>
              </CopyToClipboard>
      </Card>
    </div>
  )
}

}
