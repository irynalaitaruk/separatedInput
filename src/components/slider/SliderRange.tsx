import React, { HTMLAttributes } from 'react';
import styles from './SliderRange.module.css'

type SliderRangeProps = HTMLAttributes<HTMLDivElement>;

export const SliderRange: React.FC<SliderRangeProps> = ({ ...props }) => {
  return <div {...props} className={styles.range} />;
};
