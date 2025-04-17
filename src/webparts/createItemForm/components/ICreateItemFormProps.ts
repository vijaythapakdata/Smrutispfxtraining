import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICreateItemFormProps {
  description: string;
  siteurl:string;
  context:WebPartContext;
  DepartmentChoice:any; //single selected dropdown
  GenderChoice:any; //radio button
  SkillsChoice:any; //multi selected dropdown
  CityChoice:any; // lookup
  
}
