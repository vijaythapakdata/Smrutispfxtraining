import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';

import {ChildClass} from './ChildClass'
export default class SampleForm extends React.Component<ISampleFormProps> {
  public render(): React.ReactElement<ISampleFormProps> {
   

    return (
   <>
   <ChildClass/>
   </>
    );
  }
}
 