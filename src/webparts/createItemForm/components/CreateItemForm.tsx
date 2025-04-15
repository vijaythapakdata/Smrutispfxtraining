import * as React from 'react';
// import styles from './CreateItemForm.module.scss';
import type { ICreateItemFormProps } from './ICreateItemFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ICreateFormState } from './ICreateFormState';
import {Web} from "@pnp/sp/presets/all"
import { DatePicker, IDatePickerStrings, PrimaryButton, TextField } from '@fluentui/react';
export default class CreateItemForm extends React.Component<ICreateItemFormProps,ICreateFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      EmailAddress:"",
      DateOfBirth:"",
      EmpAge:"",
      PermanentAddress:""
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
  EmailAddress:this.state.EmailAddress,
  Age:parseInt(this.state.EmpAge),
  Address:this.state.PermanentAddress,
  DOB:new Date(this.state.DateOfBirth)
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
  EmailAddress:"",
  DateOfBirth:"",
  EmpAge:"",
  PermanentAddress:""
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
      <TextField
     label='Age'
     value={this.state.EmpAge}
     onChange={(_,event)=>this.handleForm("EmpAge",event||"")}
     />
      <TextField
     label='Permanent Address'
     value={this.state.PermanentAddress}
     onChange={(_,event)=>this.handleForm("PermanentAddress",event||"")}
     multiline
     rows={5}
     />
     <DatePicker
     label='Date of Birth'
     value={this.state.DateOfBirth}
    //  onSelectDate={{(e)=>this.setState({D})}}
    onSelectDate={(e)=>this.setState({DateOfBirth:e})}
    strings={DatePickerStrings}
    formatDate={FormateDate}
     />
     <br/>
     <PrimaryButton text="Save" onClick={()=>this.createItem()} iconProps={{iconName:'Save'}}/>
      </>
    );
  }
}
export const DatePickerStrings:IDatePickerStrings={
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  goToToday: "Go to today",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  prevYearAriaLabel: "Previous year",
  nextYearAriaLabel: "Next year",
  closeButtonAriaLabel: "Close date picker",
}
export const FormateDate=(date:any):string=>{
  var date1=new Date(date);
  var year=date1.getFullYear();
  var month=(1+date1.getMonth()).toString();
  month =month.length>1?month:"0"+month;
  var day=date1.getDate().toString();
  day=day.length>1?day:"0"+day;
  return month+"/"+day+"/"+year;
}