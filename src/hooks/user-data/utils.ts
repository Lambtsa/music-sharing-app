import { GeoLocationResponse, GeolocationType } from "@/hooks/user-data/userData.types";
import { logger } from "@/utils/logger";

export const getUserGeolocation = async (): Promise<GeolocationType> => {
  const response = await fetch(`https://ipinfo.io?token=${process.env.IP_INFO_TOKEN}`);
  const geolocation: GeoLocationResponse =  await response.json();

  logger.info("User data", {
    ip: geolocation.ip,
    city: geolocation.city,
    country: geolocation.country,
    coordinates: geolocation.loc,
    timezone: geolocation.timezone,
  });

  return {
    ip: geolocation.ip,
    city: geolocation.city,
    country: geolocation.country,
    coordinates: geolocation.loc,
    timezone: geolocation.timezone,
  };
};