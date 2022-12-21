import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

import { GetMusicLinksInput } from "@customTypes";
import {
  buildSpotifyApiUrl,
  buildSpotifyTrackListApiUrl,
  buildSpotifyAlbumListApiUrl,
} from "./spotify";

describe("buildSpotifyApiUrl helper", () => {
  const inputData: GetMusicLinksInput = {
    artist: "Last Train",
    track: "Fragile",
  };
  test("Should return valid URL Object", () => {
    expect(buildSpotifyApiUrl(inputData)).toBeInstanceOf(URL);
  });
  test("Should return valid url", () => {
    expect(buildSpotifyApiUrl(inputData).toString()).toBe(
      `https://api.spotify.com/v1/search?type=track&q=artist%3A%22Last+Train%22+track%3A%22Fragile%22`
    );
  });
  const params = buildSpotifyApiUrl(inputData).searchParams;
  test("Should have correct number of search Params", () => {
    expect([...params.keys()]).toHaveLength(2);
  });
  test("Should have valid searchParams", () => {
    expect(params.get("type")).toBe("track");
    expect(params.get("q")).toBe('artist:"Last Train" track:"Fragile"');
  });
});

describe("buildSpotifyTrackListApiUrl helper", () => {
  test("Should return valid URL Object given track", () => {
    expect(buildSpotifyTrackListApiUrl("Fragile")).toBeInstanceOf(URL);
  });
  test("Should return valid url given track", () => {
    expect(buildSpotifyTrackListApiUrl("Fragile").toString()).toBe(
      `https://api.spotify.com/v1/search?type=track&q=track%3A%22Fragile%22`
    );
  });
  const trackParams = buildSpotifyTrackListApiUrl("Fragile").searchParams;
  test("Should have correct number of search Params", () => {
    expect([...trackParams.keys()]).toHaveLength(2);
  });
  test("Should have valid searchParams", () => {
    expect(trackParams.get("type")).toBe("track");
    expect(trackParams.get("q")).toBe('track:"Fragile"');
  });
});

describe("buildSpotifyAlbumListApiUrl helper", () => {
  test("Should return valid URL Object given artist", () => {
    expect(buildSpotifyAlbumListApiUrl("Last Train")).toBeInstanceOf(URL);
  });
  test("Should return valid url given artist", () => {
    expect(buildSpotifyAlbumListApiUrl("Last Train").toString()).toBe(
      `https://api.spotify.com/v1/search?type=album&q=artist%3A%22Last+Train%22`
    );
  });
  const artistParams = buildSpotifyAlbumListApiUrl("Last Train").searchParams;
  test("Should have correct number of search Params", () => {
    expect([...artistParams.keys()]).toHaveLength(2);
  });
  test("Should have valid searchParams", () => {
    expect(artistParams.get("type")).toBe("album");
    expect(artistParams.get("q")).toBe('artist:"Last Train"');
  });
});
