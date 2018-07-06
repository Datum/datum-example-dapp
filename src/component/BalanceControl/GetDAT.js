
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
export default function GetDAT(props){
  let status = typeof(props.status)!=='undefined'?getStatus(props.status):null;
  return (
    <Card>
      <br></br>
      <br></br>
      {status}
      <br></br>
      <br></br>
      <label>TRANSACTION HASH: {props.txHash}</label>
      <br></br>
      <br></br>
      <Button style={{minWidth:'100%'}} margin="normal" variant="contained" color="primary" onClick={props.action}>
         Get DAT
      </Button>
    </Card>
  )
}

function getStatus(status){
  if(status.pending){
    return TransactionStatus({color:'yellow',txt:'PENDING...'});
  }
  if(status.failed){
    return TransactionStatus({color:'red',txt:'Failed'});
  }
  if(status.success){
    return TransactionStatus({color:'green',txt:'Success'});
  }
}

function TransactionStatus(props){
  return(
    <label style={{color:props.color}}> {props.txt}</label>
  )
}
