import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const DeezerIcon = ({ ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" fill="none" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.5127 0H29.9997V3.77954H23.5127V0Z" fill="#40AB5D"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.5127 5.24016H29.9997V9.01969H23.5127V5.24016Z" fill="url(#paint0_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.5127 10.4803H29.9997V14.2599H23.5127V10.4803Z" fill="url(#paint1_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 15.7205H6.48696V19.5H0V15.7205Z" fill="url(#paint2_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.83301 15.7205H14.32V19.5H7.83301V15.7205Z" fill="url(#paint3_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.6807 15.7205H22.1676V19.5H15.6807V15.7205Z" fill="url(#paint4_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.5127 15.7205H29.9997V19.5H23.5127V15.7205Z" fill="url(#paint5_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.6807 10.4803H22.1676V14.2599H15.6807V10.4803Z" fill="url(#paint6_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.83301 10.4803H14.32V14.2599H7.83301V10.4803Z" fill="url(#paint7_linear_8_950)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.83301 5.24016H14.32V9.01969H7.83301V5.24016Z" fill="url(#paint8_linear_8_950)"/>
      <defs>
        <linearGradient id="paint0_linear_8_950" x1="26.788" y1="9.05228" x2="26.7273" y2="5.18458" gradientUnits="userSpaceOnUse">
          <stop stopColor="#358C7B"/>
          <stop offset="0.526" stopColor="#33A65E"/>
        </linearGradient>
        <linearGradient id="paint1_linear_8_950" x1="23.4174" y1="14.0658" x2="30.0865" y2="10.6535" gradientUnits="userSpaceOnUse">
          <stop stopColor="#222B90"/>
          <stop offset="1" stopColor="#367B99"/>
        </linearGradient>
        <linearGradient id="paint2_linear_8_950" x1="0.00109816" y1="17.6116" x2="6.48263" y2="17.6116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9900"/>
          <stop offset="1" stopColor="#FF8000"/>
        </linearGradient>
        <linearGradient id="paint3_linear_8_950" x1="7.84015" y1="17.6116" x2="14.3217" y2="17.6116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8000"/>
          <stop offset="1" stopColor="#CC1953"/>
        </linearGradient>
        <linearGradient id="paint4_linear_8_950" x1="15.6787" y1="17.6116" x2="22.1603" y2="17.6116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CC1953"/>
          <stop offset="1" stopColor="#241284"/>
        </linearGradient>
        <linearGradient id="paint5_linear_8_950" x1="23.509" y1="17.6116" x2="29.9906" y2="17.6116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#222B90"/>
          <stop offset="1" stopColor="#3559A6"/>
        </linearGradient>
        <linearGradient id="paint6_linear_8_950" x1="15.4228" y1="13.3892" x2="22.4116" y2="11.3369" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CC1953"/>
          <stop offset="1" stopColor="#241284"/>
        </linearGradient>
        <linearGradient id="paint7_linear_8_950" x1="7.60941" y1="11.1127" x2="14.5456" y2="13.6478" gradientUnits="userSpaceOnUse">
          <stop offset="0.003" stopColor="#FFCC00"/>
          <stop offset="1" stopColor="#CE1938"/>
        </linearGradient>
        <linearGradient id="paint8_linear_8_950" x1="8.38498" y1="4.65278" x2="13.7561" y2="9.62996" gradientUnits="userSpaceOnUse">
          <stop offset="0.003" stopColor="#FFD100"/>
          <stop offset="1" stopColor="#FD5A22"/>
        </linearGradient>
      </defs>
    </BaseIcon>
  );
};
