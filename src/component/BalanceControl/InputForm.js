
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
export default function InputForm(props){
  return (
    <Card>
      <TextField type='number' style={{minWidth:'100%'}} label={props.lbl} margin='normal' placeholder='0 DAT'/>
      <Button style={{minWidth:'100%'}}margin ="normal"variant="contained" color="primary">
        {props.btnTxt}
      </Button>
    </Card>
  )
}
