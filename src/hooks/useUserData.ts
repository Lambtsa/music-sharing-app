import { useCallback, useEffect, useState } from "react";

interface GeoLocationReponse {
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

export const useUserData = () => {
  /* ######################################## */
  /* State */
  /* ######################################## */
  const [ip, setIp] = useState<string | undefined>(undefined);

  /* ######################################## */
  /* Fetch Requests */
  /* ######################################## */
  const getGeoLocation = useCallback(async (ip: string) => {
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=3c03e4000d10b6`
    );
    const data = (await response.json()) as GeoLocationReponse;
    console.log({ data });
  }, []);

  const getIp = useCallback(async () => {
    const response = await fetch("https://api.ipify.org?format=json	");
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
    // geoLocation,
    // device,
    ip,
  };
};
