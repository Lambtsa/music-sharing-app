export interface GeoLocationResponse {
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

export type GeolocationType = Pick<GeoLocationResponse, "ip" | "city" | "country" | "timezone"> & {
  coordinates: string
};
