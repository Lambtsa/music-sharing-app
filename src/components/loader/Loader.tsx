import type { ReactElement } from "react";

import styles from "./Loader.module.css";

interface LoaderProps {
  isLight: boolean;
}

export const Loader = ({ isLight }: LoaderProps): ReactElement => {
  console.log({
    isLight 
  });
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='inline-block relative w-[80px] h-[80px]'>
        <div className={`${styles["loader"]} inline-block absolute left-2 w-2 ${isLight ? "bg-pastel-pink" : "bg-ivory-20"}`} />
        <div className={`${styles["loader"]} inline-block absolute left-2 w-2 ${isLight ? "bg-pastel-pink" : "bg-ivory-20"}`} />
        <div className={`${styles["loader"]} inline-block absolute left-2 w-2 ${isLight ? "bg-pastel-pink" : "bg-ivory-20"}`} />
        <div className={`${styles["loader"]} inline-block absolute left-2 w-2 ${isLight ? "bg-pastel-pink" : "bg-ivory-20"}`} />
        <div className={`${styles["loader"]} inline-block absolute left-2 w-2 ${isLight ? "bg-pastel-pink" : "bg-ivory-20"}`} />
      </div>
    </div>
  );
};
