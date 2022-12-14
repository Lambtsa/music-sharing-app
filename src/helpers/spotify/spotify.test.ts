import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

import { GetMusicLinksInput } from "@customTypes";
import { buildSpotifyApiUrl } from "./spotify";

describe("buildSpotifyApiUrl helper", () => {
  const inputData: GetMusicLinksInput = {
    artist: "Last Train",
    title: "Fragile",
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
