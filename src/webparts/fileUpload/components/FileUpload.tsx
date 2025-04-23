import * as React from 'react';
import { useState } from 'react';
import type { IFileUploadProps } from './IFileUploadProps';
import { IFileUploadState } from './IFileUploadState';
import { Web } from '@pnp/sp/webs';
// import { TextField } from '@fluentui/react';
// import { Attachments } from '@pnp/sp/attachments';

const FileUpload:React.FC<IFileUploadProps>=(props:IFileUploadProps)=>{
  const [attachments,setAttachments]=useState<IFileUploadState>({Attachments:[]});

  //Handle file selection
  const handleFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const files=event.target.files;
    if(files){
      setAttachments({ Attachments: Array.from(files) });
    }
  }

  //Upload file to SharePoint list
  const uploadFile=async()=>{
    try{
const web=Web(props.siteurl);
const list =web.lists.getByTitle(props.ListName);
//add an empty item first
const item=await list.items.add({});
const itemId=item.data.Id;

//upload each file
for (const file of attachments.Attachments) {
  const arrayBuffer=await file.arrayBuffer();
  await list.items.getById(itemId).attachmentFiles.add(file.name,arrayBuffer);
    }
    console.log("Files uploaded successfully");
  }
    catch(err){
console.log("Error uploading files",err);
    }
  }

  return(
    <>
    {/* <TextField label='File Uplaod' type='file' value={Attachments} onChange={handleFileChange} /> */}
    <div>
      
      <input type='file'multiple onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
    </>
  )
}
export default FileUpload;



