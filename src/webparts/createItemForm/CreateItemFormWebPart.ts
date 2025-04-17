import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'CreateItemFormWebPartStrings';
import CreateItemForm from './components/CreateItemForm';
import { ICreateItemFormProps } from './components/ICreateItemFormProps';
import {sp} from "@pnp/sp/presets/all";
export interface ICreateItemFormWebPartProps {
  description: string;
  CityChoice:any;
}

export default class CreateItemFormWebPart extends BaseClientSideWebPart<ICreateItemFormWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext:this.context
      });
      this.getLookuupValues();
    });
  }
  public async render(): Promise<void> {
    const element: React.ReactElement<ICreateItemFormProps> = React.createElement(
      CreateItemForm,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context,
        DepartmentChoice:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,'Department'),
        GenderChoice:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,'Gender'),
        SkillsChoice:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,'Skills'),
        CityChoice:this.properties.CityChoice

      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  // Department Gender Skills
  private async getChoiceValues(siteurl:string,fieldValue:string):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('First List')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,
  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata',
      'Content-Type':'application/json;odata=nometadata',
            'odata-version':''
    }
  }
);
if(!response.ok){
  throw new Error(`Error fetching choice values: ${response.statusText}`);
    }
    const data=await response.json();
    const choices=data?.value[0]?.Choices||[];
    return choices.map((choice:any)=>({
      key:choice,
      text:choice
    }));
  }
    catch(err){
console.error("Error fetching choice values:", err);
    }
    finally{
console.log("Fetching choice values completed");
    }
  }
  //Lookup City
  private async getLookuupValues():Promise<void>{
    try{
      const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,
        {
          method:'GET',
          headers:{
            'Accept':'application/json;odata=nometadata',
            'Content-Type':'application/json;odata=nometadata',
            'odata-version':''
          }
        }
      );
      if(!response.ok){
        throw new Error(`Error fetching choice values: ${response.statusText}`);
          }
const data=await response.json();
const cityOptions=data.value.map((city:{ID:string,Title:string})=>({
  key:city.ID,
  text:city.Title
}));
this.properties.CityChoice=cityOptions
    }
    catch(err){
      console.error("Error fetching choice values:", err);
    }
  }
}
