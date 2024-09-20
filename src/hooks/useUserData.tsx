import { useCallback, useEffect, useState } from 'react';

interface GeoLocationResponse {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface GeolocationType {
  city: string;
  country: string;
  coordinates: string;
  timezone: string;
}

export interface UseUserDataReturnType {
  ip: string | undefined;
  geolocation: GeolocationType | undefined;
}

export const useUserData = (): UseUserDataReturnType => {
  /* ######################################## */
  /* State */
  /* ######################################## */
  const [ip, setIp] = useState<string | undefined>(undefined);
  const [geolocation, setGeolocation] = useState<GeolocationType>();

  /* ######################################## */
  /* Fetch Requests */
  /* ######################################## */
  const getGeoLocation = useCallback(async (ip: string) => {
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=3c03e4000d10b6`,
    );
    const data = (await response.json()) as GeoLocationResponse;
    setGeolocation({
      city: data.city,
      country: data.country,
      coordinates: data.loc,
      timezone: data.timezone,
    });
  }, []);

  const getIp = useCallback(async () => {
    const response = await fetch('https://api.ipify.org?format=json	');
    const { ip: responseIp } = await response.json();
    setIp(responseIp);
  }, []);

  useEffect(() => {
    getIp();
  }, [getIp]);

  useEffect(() => {
    if (!ip) {
      return;
    }
    getGeoLocation(ip);
  }, [getGeoLocation, ip]);

  return {
    ip,
    geolocation,
  };
};
