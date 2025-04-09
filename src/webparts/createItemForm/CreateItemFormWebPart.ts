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

export interface ICreateItemFormWebPartProps {
  description: string;
}

export default class CreateItemFormWebPart extends BaseClientSideWebPart<ICreateItemFormWebPartProps> {


  public render(): void {
    const element: React.ReactElement<ICreateItemFormProps> = React.createElement(
      CreateItemForm,
      {
        description: this.properties.description,

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
}
