import {
  determineUrlType, getTrackId, isValidMusicStreamingUrl 
} from "./url";

describe("isValidMusicStreamingUrl helper", () => {
  test("A correct spotify link should return true", () => {
    expect(isValidMusicStreamingUrl("https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i")).toBe(true);
  });
  test("An incorrect spotify link should return false", () => {
    expect(isValidMusicStreamingUrl("https://open.spotify.com/")).toBe(false);
    expect(isValidMusicStreamingUrl("https://www.random.com")).toBe(false);
  });

  test("A correct deezer link should return true", () => {
    expect(isValidMusicStreamingUrl("https://www.deezer.com/track/12345")).toBe(true);
  });
  test("An incorrect deezer link should return false", () => {
    expect(isValidMusicStreamingUrl("https://www.deezer.com/")).toBe(false);
  });

  test("A correct youtube link should return true", () => {
    expect(isValidMusicStreamingUrl("https://www.youtube.com/watch?v=test")).toBe(true);
  });
  test("An incorrect youtube link should return false", () => {
    expect(isValidMusicStreamingUrl("https://www.youtube.com/")).toBe(false);
    expect(isValidMusicStreamingUrl("https://www.youtube.com/watch?t=")).toBe(false);
  });
});

describe("determineUrlType helper function", () => {
  test("should return 'spotify' for valid spotify url", () => {
    expect(determineUrlType("https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i")).toBe("spotify");
  });
  test("should return 'deezer' for valid deezer url", () => {
    expect(determineUrlType("https://www.deezer.com/track/2SGBEDwsOAOAHrrdAd304i")).toBe("deezer");
  });
  test("should return 'youtube' for valid youtube url", () => {
    expect(determineUrlType("https://www.youtube.com/watch?v=2SGBEDwsOAOAHrrdAd304i")).toBe("youtube");
  });
  test("should return null for random urls", () => {
    expect(determineUrlType("https://www.google.com")).toBe(null);
  });
});

describe("getTrackId helper function", () => {
  test("should return valid id given valid spotify url", () => {
    expect(
      getTrackId("https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i", "spotify")
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });

  test("should return valid id given valid deezer url", () => {
    expect(
      getTrackId("https://www.deezer.com/track/2SGBEDwsOAOAHrrdAd304i", "deezer")
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });

  test("should return valid id given valid youtube url", () => {
    expect(
      getTrackId("https://www.youtube.com/watch?v=2SGBEDwsOAOAHrrdAd304i", "youtube")
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });
});