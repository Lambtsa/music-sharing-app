import styles from './Loader.module.css';

interface LoaderProps {
  isLight: boolean;
}

export const Loader = ({ isLight }: LoaderProps): JSX.Element => {
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='inline-block relative w-[80px] h-[80px]'>
        <div className={`${styles['loader']} inline-block absolute left-2 w-2 ${isLight ? 'bg-pastelPink' : 'bg-ivory20'}`} />
        <div className={`${styles['loader']} inline-block absolute left-2 w-2 ${isLight ? 'bg-pastelPink' : 'bg-ivory20'}`} />
        <div className={`${styles['loader']} inline-block absolute left-2 w-2 ${isLight ? 'bg-pastelPink' : 'bg-ivory20'}`} />
        <div className={`${styles['loader']} inline-block absolute left-2 w-2 ${isLight ? 'bg-pastelPink' : 'bg-ivory20'}`} />
        <div className={`${styles['loader']} inline-block absolute left-2 w-2 ${isLight ? 'bg-pastelPink' : 'bg-ivory20'}`} />
      </div>
    </div>
  );
};
