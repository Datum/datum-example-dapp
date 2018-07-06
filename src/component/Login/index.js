import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
const ethUtils = require('ethereumjs-util');



export default class LOGIN extends Component{
state={
  status:{
    empty:false,
    valid:true
  },
  pk:''
}
  validatePK(pk){
    return this.isEmpty(pk) || ethUtils.isValidPrivate(ethUtils.toBuffer(pk));
  }
  isEmpty(str){
    return typeof(str)==='undefined'||
          str===null||
          str.length===0
  }

  handleChange(event){
    let tmpPK = event.target.value;
    this.setState({
      pk:tmpPK,
      status:{
        empty:this.isEmpty(tmpPK),
        valid:this.validatePK(tmpPK)
      }
    });
  }

  handleSubmit(event){
    event.preventDefault();
    if(typeof(this.state.pk)==='undefined'||this.state.pk.length===0)
    return;


    let accountObj =this.generateAccountObj(this.state.pk);
    this.props.next(accountObj);
  }

  /**
   * generateAccountObj - Generate account Public key, address
   *
   * @param  {String} pk private Key
   * @return {Object}  Returns account pubKey,Address,Pk
   */
  generateAccountObj(pk){
    let pkBuffer = ethUtils.toBuffer(pk);
    let tmpState = {...this.state};
    return {
      privateKey:tmpState.pk,
      address:`0x${ethUtils.privateToAddress(pkBuffer).toString('hex')}`,
      publicKey:ethUtils.privateToPublic(pkBuffer).toString('hex')
    }
  }
  handleClear(){
    this.setState({
      pk:'',
      status:{
        empty:true,
        valid:true
      }
    });
  }

  render(){
    return (
      <div>
      <Card style={{margin:'5PX', padding:20}}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField style={{'minWidth':'100%'}} id='pk' label='Private Key' margin='normal' placeholder='Please insert your private Key' onChange={this.handleChange.bind(this)} value={this.state.pk}/>
          <br></br>
          <div style={{paddingTop:20}}>
            <Button style={{marginRight:8}} margin ="normal"variant="contained" color="primary" type="submit" disabled={!(!this.state.status.empty&&this.state.status.valid)}>
            Load User
          </Button>
          <Button className="button" margin="normal" variant="contained" color="secondary" disabled={this.state.status.empty} onClick={this.handleClear.bind(this)}>Clear</Button>
        </div>
      </form>
      </Card>
      </div>
    )
  }
}
