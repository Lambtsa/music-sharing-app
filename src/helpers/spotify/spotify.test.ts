import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

import { GetMusicLinksInput } from "@customTypes";
import { buildSpotifyApiUrl, buildSpotifyListApiUrl } from "./spotify";

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

describe("buildSpotifyListApiUrl helper", () => {
  test("Should return valid URL Object given artist", () => {
    expect(buildSpotifyListApiUrl("Last Train", "artist")).toBeInstanceOf(URL);
  });
  test("Should return valid URL Object given track", () => {
    expect(buildSpotifyListApiUrl("Fragile", "track")).toBeInstanceOf(URL);
  });
  test("Should return valid url given artist", () => {
    expect(buildSpotifyListApiUrl("Last Train", "artist").toString()).toBe(
      `https://api.spotify.com/v1/search?type=track&q=artist%3A%22Last+Train%22`
    );
  });
  test("Should return valid url given track", () => {
    expect(buildSpotifyListApiUrl("Fragile", "track").toString()).toBe(
      `https://api.spotify.com/v1/search?type=track&q=track%3A%22Fragile%22`
    );
  });
  const artistParams = buildSpotifyListApiUrl(
    "Last Train",
    "artist"
  ).searchParams;
  const trackParams = buildSpotifyListApiUrl("Fragile", "track").searchParams;
  test("Should have correct number of search Params", () => {
    expect([...artistParams.keys()]).toHaveLength(2);
  });
  test("Should have correct number of search Params", () => {
    expect([...trackParams.keys()]).toHaveLength(2);
  });
  test("Should have valid searchParams", () => {
    expect(artistParams.get("type")).toBe("track");
    expect(artistParams.get("q")).toBe('artist:"Last Train"');
  });
  test("Should have valid searchParams", () => {
    expect(trackParams.get("type")).toBe("track");
    expect(trackParams.get("q")).toBe('track:"Fragile"');
  });
});
