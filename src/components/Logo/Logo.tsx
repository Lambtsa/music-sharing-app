import { Icon } from '@/components/icon';


interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps): JSX.Element => {
  return (
    <div className='flex justify-center items-center absolute left-4 top-0'>
      {isLight ? <Icon icon='dark' width={60} height={60} /> : <Icon icon='light' width={60} height={60} />}
    </div>
  );
};
