import React, {Component} from 'react';
import axios from 'axios';

export default class UserLoader extends Component{

state={username:'kash'};

handleSubmit(event){
  event.preventDefault();
  axios.get('http://192.168.1.54:3000/user/'+this.state.username).then((res) => {
      this.props.update({pubKey:res.data.pubKey,address:res.data.address});
    }).catch((err) => {
      console.error(err);
    });
}
handleChange(event){
  this.setState({username:event.target.value});
}

render() {

  return (
    <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this)}/>
        <input type="submit" value="Load User Data" />
      </form>
    </div>
  );
}
}
