import React, {Component} from 'react';
import DatumApi from '../../lib/DatumApi';
import TextField from '@material-ui/core/TextField';
const units = [
  {
    value: 1073741824,
    label: 'GB',
  },
  {
    value: 1048576,
    label: 'MB',
  },
  {
    value: 1024,
    label: 'KB',
  }];


export default class StorageCalculator extends Component {
  state = {
    days:1,
    size:0,
    cost: 0,
    unit:1048576
  }


  handleChange(event){
    console.log(event.target.id+' '+event.target.value);
    this.setState({[event.target.id]:event.target.value});
    this.setState({cost:DatumApi.getStorageCost(this.state.unit,this.state.size,this.state.days)});
  }



  render() {
    return (
       <div>
         <TextField
                   id="unit"
                   select
                   label="Unit"
                   value={this.state.unit}
                   onChange={this.handleChange.bind(this)}
                   SelectProps={{
                     native: true,
                   }}
                   margin="normal">
                   {units.map(option => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </TextField>
      < TextField id = "size"
      label = "Size"
      type = "number"
      InputLabelProps = {
        {
          shrink: true,
        }
      }
      margin = "normal"
      value={this.state.size}
      onChange={this.handleChange.bind(this)}/>

    < TextField id = "days"
      label = "Number of Days"
      type = "number"
      InputLabelProps = {
        {
          shrink: true,
        }
      }
      margin = "normal"
      value={this.state.days}
      onChange={this.handleChange.bind(this)}/>

      <label>{this.state.cost} DAT</label>
      </div>
    )
  }
}
