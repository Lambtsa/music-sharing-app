'use client';

import { type ReactElement, useMemo } from 'react';

import type { IconProps, IconType } from './Icon.types';
import {
  BurgerIcon,
  ChevronIcon,
  CloseIcon,
  DarkIcon,
  DeezerIcon,
  HistoryIcon,
  InfoIcon,
  LightIcon,
  LinkIcon,
  MoonIcon,
  MusicIcon,
  PlaceholderIcon,
  PrivacyIcon,
  SearchIcon,
  ShareIcon,
  SignoutIcon,
  SpotifyIcon,
  SunIcon,
  TermsIcon,
  TickIcon,
  ValidIcon,
  WarningIcon,
  YoutubeIcon,
} from './icons';

export const icons: Record<IconType, (props: Omit<IconProps, 'children'>) => ReactElement> = {
  burger: BurgerIcon,
  close: CloseIcon,
  chevron: ChevronIcon,
  dark: DarkIcon,
  deezer: DeezerIcon,
  history: HistoryIcon,
  info: InfoIcon,
  light: LightIcon,
  link: LinkIcon,
  moon: MoonIcon,
  music: MusicIcon,
  placeholder: PlaceholderIcon,
  privacy: PrivacyIcon,
  search: SearchIcon,
  share: ShareIcon,
  signout: SignoutIcon,
  spotify: SpotifyIcon,
  sun: SunIcon,
  terms: TermsIcon,
  tick: TickIcon,
  valid: ValidIcon,
  warning: WarningIcon,
  youtube: YoutubeIcon,
};

export const Icon = ({
  id,
  icon,
  height = 24,
  width = 24,
  color = '#000000',
  onClick,
  className,
  disabled = false,
  rotate = 0,
  ...props
}: Omit<IconProps, 'children'> & { icon: IconType }): ReactElement => {
  const IconComponent = useMemo(() => {
    return icons[icon];
  }, [icon]);

  const { ...rest } = props;

  const buttonClassName = useMemo((): string => {
    let btnClass = `${className ?? ''} p-1.5`;

    if (onClick) {
      btnClass = `${className ?? ''} p-1.5 hover:bg-blue50 rounded`;
    }

    if (disabled) {
      btnClass = `${className ?? ''} p-1.5 cursor-not-allowed`;
    }

    return btnClass;
  }, [className, disabled, onClick]);

  const hasOnClick = useMemo(() => !!onClick, [onClick]);

  return (
    <>
      {hasOnClick && (
        <button type="button" disabled={disabled} className={buttonClassName} onClick={onClick}>
          <IconComponent
            id={id}
            rotate={rotate}
            color={disabled ? '#687787' : color}
            height={height}
            width={width}
            opacity={disabled ? 0.6 : 1}
            {...rest}
          />
        </button>
      )}
      {!hasOnClick && (
        <IconComponent
          id={id}
          rotate={rotate}
          color={color}
          height={height}
          width={width}
          className={className}
          opacity={disabled ? 0.6 : 1}
          {...rest}
        />
      )}
    </>
  );
};
