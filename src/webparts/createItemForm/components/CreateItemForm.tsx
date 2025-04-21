import * as React from 'react';
// import styles from './CreateItemForm.module.scss';
import type { ICreateItemFormProps } from './ICreateItemFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ICreateFormState } from './ICreateFormState';
import {Web} from "@pnp/sp/presets/all"
import { PrincipalType,PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { ChoiceGroup, DatePicker, Dropdown, IDatePickerStrings, IDropdownOption, PrimaryButton, TextField } from '@fluentui/react';
export default class CreateItemForm extends React.Component<ICreateItemFormProps,ICreateFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      EmailAddress:"",
      DateOfBirth:"",
      EmpAge:"",
      PermanentAddress:"",
      Department:"",
      Gender:"",
      City:"",
      Skills:[],
      Manager:[],
      ManagerId:[],
      Admin:"",
      AdminId:0

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
  DOB:new Date(this.state.DateOfBirth),
  Department:this.state.Department,
  Gender:this.state.Gender,
  CityId:this.state.City,
  Skills:{results:this.state.Skills},
  ManagerId:{results:this.state.ManagerId},
  AdminId:this.state.AdminId,
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
  PermanentAddress:"",
  Gender:"",
  City:"",
  Department:"",
  Skills:[]
});
  }
  //Event handling
  private handleForm=(fieldValue:keyof ICreateFormState,value:string|boolean|number)=>{
    this.setState({
      [fieldValue]:value
    }as Pick<ICreateFormState, keyof ICreateFormState>)
  }

  //onskills change
  private onSkillsChange=(event:React.FormEvent<HTMLElement>,option:IDropdownOption):void=>{
    const selectedKey=option.selected?[...this.state.Skills,option.key as string]:
    this.state.Skills.filter((key:any)=>key!==option.key);
    this.setState({Skills:selectedKey});
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
     <Dropdown
     placeholder='--select option'
     options={this.props.DepartmentChoice}
     selectedKey={this.state.Department}
     label='Department'
     onChange={(_,event)=>this.handleForm("Department",event?.key as string||"")}
     />
      <Dropdown
     placeholder='--select option'
     options={this.props.CityChoice}
     selectedKey={this.state.City}
     label='City'
     onChange={(_,event)=>this.handleForm("City",event?.key as number||"")}
     />
      <ChoiceGroup
   
     options={this.props.GenderChoice}
     selectedKey={this.state.Gender}
     label='Gender'
     onChange={(_,event)=>this.handleForm("Gender",event?.key as string||"")}
     />
      <Dropdown
     placeholder='--select option'
     options={this.props.SkillsChoice}
    //  selectedKey={this.state.Department}
    defaultSelectedKeys={this.state.Skills}
    multiSelect
     label='Skills'
    //  onChange={(_,event)=>this.handleForm("Department",event?.key as string||"")}
    onChange={this.onSkillsChange}
     />
     <PeoplePicker
     context={this.props.context as any}
     titleText='Admin'
     personSelectionLimit={1}
     ensureUser={true}
     principalTypes={[PrincipalType.User]}
     defaultSelectedUsers={[this.state.Admin?this.state.Admin:""]}
     onChange={this._getAdminValues}
     webAbsoluteUrl={this.props.siteurl}
     />
     <PeoplePicker
     context={this.props.context as any}
     titleText='Manager'
     personSelectionLimit={3}
     ensureUser={true}
     principalTypes={[PrincipalType.User]}
    //  defaultSelectedUsers={[this.state.Admin?this.state.Admin:""]}
    defaultSelectedUsers={this.state.Manager}
     onChange={this._getManagerValues}
     webAbsoluteUrl={this.props.siteurl}
     />
     <br/>
     <PrimaryButton text="Save" onClick={()=>this.createItem()} iconProps={{iconName:'Save'}}/>
      </>
    );
  }
  //Get Admin Single Selected Peoplepicker
  private _getAdminValues=(items:any[]):void=>{
    if(items.length>0){
      this.setState({
        Admin:items[0].text,
        AdminId:items[0].id
      });
    }
    else{
      this.setState({
        Admin:"",
        AdminId:0
      });
    }
  }
  //Multiselect peopelpicker
  private _getManagerValues=(items:any):void=>{
    const managers=items.map((item:any)=>item.text);
    const managerId=items.map((item:any)=>item.id);
    this.setState({
      Manager:managers,
      ManagerId:managerId
    });
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