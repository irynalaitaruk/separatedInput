import React, { HTMLAttributes } from 'react';
import styles from './SliderTrack.module.css'

type SliderTrackProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const SliderTrack: React.FC<SliderTrackProps> = ({ children, className, ...props }) => {
  return <div {...props} className={styles.track}> {children} </div>;
};
