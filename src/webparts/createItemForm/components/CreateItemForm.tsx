import * as React from 'react';
// import styles from './CreateItemForm.module.scss';
import type { ICreateItemFormProps } from './ICreateItemFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ICreateFormState } from './ICreateFormState';
import {Web} from "@pnp/sp/presets/all"
import { PrimaryButton, TextField } from '@fluentui/react';
export default class CreateItemForm extends React.Component<ICreateItemFormProps,ICreateFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      EmailAddress:""
    }
  }
  //Create Items

  public async createItem(){
//const => non volitile value can not be uupdate 
//var consider as globalvaribale and can udate the value
//let >local variable can only be accessbile in the blocks
let web=Web(this.props.siteurl);
await web.lists.getByTitle("First List").items.add({
  Title:this.state.Name,
  EmailAddress:this.state.EmailAddress
}).then((resp)=>{
  console.log("No error found");
  alert("Item Created");
  return resp;
})
.catch((err)=>{
  console.log("Error Found");
  alert("Error Found");
  throw err;
})
this.setState({
  Name:"",
  EmailAddress:""
})
  }
  //Event handling
  private handleForm=(fieldValue:keyof ICreateFormState,value:string|boolean|number)=>{
    this.setState({
      [fieldValue]:value
    }as Pick<ICreateFormState, keyof ICreateFormState>)
  }
  public render(): React.ReactElement<ICreateItemFormProps> {
   

    return (
      <>
     <TextField
     label='Name'
     value={this.state.Name}
     onChange={(_,event)=>this.handleForm("Name",event||"")}
     />
      <TextField
     label='Email Address'
     value={this.state.EmailAddress}
     onChange={(_,event)=>this.handleForm("EmailAddress",event||"")}
     />
     <br/>
     <PrimaryButton text="Save" onClick={()=>this.createItem()} iconProps={{iconName:'Save'}}/>
      </>
    );
  }
}
