import React, { HTMLAttributes } from 'react';
import styles from './SliderThumb.module.css'

type SliderThumbProps = HTMLAttributes<HTMLDivElement>;

export const SliderThumb: React.FC<SliderThumbProps> = ({ ...props }) => {
  return <div {...props} className={styles.thumb} />;
};
