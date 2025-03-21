import React, { HTMLAttributes } from 'react';
import styles from './SliderRoot.module.css'

type SliderRootProps = HTMLAttributes<HTMLDivElement>;

export const SliderRoot: React.FC<SliderRootProps> = ({ children, ...props }) => {
  return <div {...props} className={styles.root}> {children} </div>
};
