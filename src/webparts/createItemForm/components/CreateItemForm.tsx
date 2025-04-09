import * as React from 'react';
import styles from './CreateItemForm.module.scss';
import type { ICreateItemFormProps } from './ICreateItemFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class CreateItemForm extends React.Component<ICreateItemFormProps> {
  public render(): React.ReactElement<ICreateItemFormProps> {
   

    return (
      <>
      <h1 className={styles.h1}>
        Create Item Webpart Form.
      </h1>
      </>
    );
  }
}
