import * as React from "react"
import { Label, PrimaryButton, TextField } from "@fluentui/react"
import { DatePicker } from "@fluentui/react-datepicker-compat";
// import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
export class ChildClass extends React.Component<{}>{
    public render(): React.ReactElement<{}> {
        return(
            <>
            <p>I am child class</p>
            <PrimaryButton text ="Add new item" iconProps={{iconName:'add'}}/>
            <hr/>
            <p>User Access Form:</p>
            <form>
                <Label>Name:</Label>
                <TextField type='text'
                iconProps={{iconName:'contact'}} placeholder="Enter your name"/>
                <Label>Email:</Label>
                <TextField type='email' iconProps={{iconName:'mail'}} placeholder="vijaythapak2001@gmail.com"/>
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
            </form>
            </>
        )
    }
}