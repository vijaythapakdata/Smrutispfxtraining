import * as React from "react"
import { ChoiceGroup, ComboBox, Dropdown, Label, PrimaryButton, SearchBox, TextField,Stack} from "@fluentui/react"
import { DatePicker } from "@fluentui/react-datepicker-compat";
// import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
const stackTokent={childrenGap:10}
export class ChildClass extends React.Component<{}>{
    public render(): React.ReactElement<{}> {
        return(
            <>
            <p>I am child class</p>
            <PrimaryButton text ="Add new item" iconProps={{iconName:'add'}}/>
            <hr/>
            <SearchBox placeholder="Search here" iconProps={{iconName:'search'}}/>
            <p>User Access Form:</p>

            <form>
              <Stack tokens={stackTokent} horizontal>
                <Label>Name:</Label>
                <TextField type='text'
                iconProps={{iconName:'contact'}} placeholder="Enter your name"/>
                <Label>Email:</Label>
                <TextField type='email' iconProps={{iconName:'mail'}} placeholder="vijaythapak2001@gmail.com"/>
                </Stack>
                <Label>Password:</Label>
                <TextField type="password" canRevealPassword/>
                <Label>I am disabled</Label>
                <TextField placeholder="I am disable field" disabled/>
                <Label>Error message</Label>
                <TextField placeholder="Error message" errorMessage={"This field is required"}/>
                <Label>Mulitline</Label>
                <TextField multiline rows={5}/>
                <Label>Money</Label>
                <TextField prefix="$"/>
                <Label>Attachement</Label>
                <TextField type='file'/>
                <Label>Date</Label>
                <DatePicker
        
        placeholder="Select a date..."
        // {...this.props}
      
      />
      <Dropdown 
      placeholder="Select an option"
      options={[
        {key:'Apple',text:'Apple'},
        {key:'Banana',text:'Banana'},
        {key:'Mango',text:'Mango'},
      ]}
      label="Select a fruit"
      />
        <Dropdown 
      placeholder="Select an option"
      options={[
        {key:'Apple',text:'Apple'},
        {key:'Banana',text:'Banana'},
        {key:'Mango',text:'Mango'},
      ]}
      label="MulitSelect"
      multiSelect
      defaultSelectedKeys={['Apple','Banana']}
      />
       <ComboBox
      placeholder="Select an option"
      options={[
        {key:'Apple',text:'Apple'},
        {key:'Banana',text:'Banana'},
        {key:'Mango',text:'Mango'},
      ]}
      label="MulitSelect"
      multiSelect
      autoComplete="on"
      allowFreeform
      
      />
       <ChoiceGroup
    
      options={[
        {key:'Apple',text:'Apple'},
        {key:'Banana',text:'Banana',disabled:true},
        {key:'Mango',text:'Mango'},
      ]}
      label="Radio Buttons"
  
  
      />
            </form>
            </>
        )
    }
}