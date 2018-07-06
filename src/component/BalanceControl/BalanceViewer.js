import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

export default function BalanceViewer(props){
  return (
      <Grid item xs ={12} sm={6}>
          <InputLabel htmlFor="balance-viewer">{props.lbl}</InputLabel>
          <Input style={{minWidth:'100%'}}
           id="balance-viewer"
            value={props.balance}
            endAdornment={<InputAdornment position="end">DAT</InputAdornment>} disabled />
      </Grid>
  );
}
