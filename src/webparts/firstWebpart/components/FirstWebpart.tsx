import * as React from 'react';
// import styles from './FirstWebpart.module.scss';
import type { IFirstWebpartProps } from './IFirstWebpartProps';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class FirstWebpart extends React.Component<IFirstWebpartProps> {
  public render(): React.ReactElement<IFirstWebpartProps> {
    

    return (
      <>
      <p>I am learning <strong>SPFX</strong></p>
      </>
    );
  }
}
