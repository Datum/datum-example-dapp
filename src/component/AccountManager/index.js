
import Login from '../Login';
import NewAccount from '../NewAccount';
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

export default class AccountManager extends Component{

render(){
  return(
    <Grid container spacing={24}>
      <Grid item xs={12} >
        <NewAccount/>
      </Grid>
      <Grid item xs={12} >
        <Login next={this.props.next}/>
      </Grid>
    </Grid>
  );
  }

}
