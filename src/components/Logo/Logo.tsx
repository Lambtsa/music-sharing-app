import { ReactComponent as DarkLogo } from '@/assets/darkLogo.svg';
import { ReactComponent as LightLogo } from '@/assets/lightLogo.svg';

interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps): JSX.Element => {
  return (
    <div className='flex justify-center items-center absolute left-4 top-0'>{isLight ? <DarkLogo /> : <LightLogo />}</div>
  );
};
