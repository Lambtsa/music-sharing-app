import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

import { GetMusicLinksInput } from "@customTypes";
import { buildYoutubeApiUrl, buildYoutubeVideoUrl } from "./youtube";

describe("buildYoutubeApiUrl helper", () => {
  const inputData: GetMusicLinksInput = {
    artist: "Last Train",
    track: "Fragile",
  };
  test("Should return valid URL Object", () => {
    expect(buildYoutubeApiUrl(inputData)).toBeInstanceOf(URL);
  });
  test("Should return valid url", () => {
    expect(buildYoutubeApiUrl(inputData).toString()).toBe(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=artist%3A%22Last+Train%22+track%3A%22Fragile%22`
    );
  });
  const params = buildYoutubeApiUrl(inputData).searchParams;
  test("Should have correct number of search Params", () => {
    expect([...params.keys()]).toHaveLength(2);
  });
  test("Should have valid searchParams", () => {
    expect(params.get("key")).toBe(process.env.YOUTUBE_API_KEY);
    expect(params.get("q")).toBe('artist:"Last Train" track:"Fragile"');
  });
});

describe("buildYoutubeVideoUrl helper", () => {
  const inputId: string = "NTPcPRFg-FY";
  test("Should return valid URL Object", () => {
    expect(buildYoutubeVideoUrl(inputId)).toBeInstanceOf(URL);
  });
  test("Should return valid url", () => {
    expect(buildYoutubeVideoUrl(inputId).toString()).toBe(
      `https://www.youtube.com/watch?v=${inputId}`
    );
  });
  const params = buildYoutubeVideoUrl(inputId).searchParams;
  test("Should have correct number of search Params", () => {
    expect([...params.keys()]).toHaveLength(1);
  });
  test("Should have valid searchParams", () => {
    expect(params.get("v")).toBe(inputId);
  });
});
