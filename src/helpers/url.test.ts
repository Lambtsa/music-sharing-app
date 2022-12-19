import { InputSelection } from "@constants/input";
import { isValidInput, determineUrlType, getTrackId } from "./url";

describe("isValidInput helper input", () => {
  test("A correct spotify link should return true", () => {
    expect(
      isValidInput("https://open.spotify.com/track/", InputSelection.Url)
    ).toBe(true);
  });
  test("An incorrect spotify link should return false", () => {
    expect(isValidInput("https://open.spotify.com/", InputSelection.Url)).toBe(
      false
    );
    expect(
      isValidInput("https://open.spotify.com/track", InputSelection.Url)
    ).toBe(false);
    expect(
      isValidInput("https://www.spotify.com/track", InputSelection.Url)
    ).toBe(false);
    expect(isValidInput("https://www.random.com", InputSelection.Url)).toBe(
      false
    );
  });

  test("A correct deezer link should return true", () => {
    expect(
      isValidInput("https://www.deezer.com/track/", InputSelection.Url)
    ).toBe(true);
  });
  test("An incorrect deezer link should return false", () => {
    expect(isValidInput("https://www.deezer.com/", InputSelection.Url)).toBe(
      false
    );
    expect(
      isValidInput("https://www.deezer.com/track", InputSelection.Url)
    ).toBe(false);
    expect(
      isValidInput("https://open.deezer.com/track", InputSelection.Url)
    ).toBe(false);
    expect(isValidInput("https://www.random.com", InputSelection.Url)).toBe(
      false
    );
  });

  test("A correct youtube link should return true", () => {
    expect(
      isValidInput("https://www.youtube.com/watch?v=test", InputSelection.Url)
    ).toBe(true);
  });
  test("An incorrect youtube link should return false", () => {
    expect(isValidInput("https://www.youtube.com/", InputSelection.Url)).toBe(
      false
    );
    expect(
      isValidInput("https://www.youtube.com/watch?t=", InputSelection.Url)
    ).toBe(false);
    expect(
      isValidInput("https://open.youtube.com/track", InputSelection.Url)
    ).toBe(false);
    expect(isValidInput("https://www.random.com", InputSelection.Url)).toBe(
      false
    );
  });

  test("A correct artist name should return true", () => {
    expect(isValidInput("The kooks", InputSelection.Artist)).toBe(true);
  });
  test("An empty string should return false", () => {
    expect(isValidInput("", InputSelection.Artist)).toBe(false);
  });

  test("A correct title name should return true", () => {
    expect(isValidInput("Seaside", InputSelection.Track)).toBe(true);
  });
  test("An empty string should return false", () => {
    expect(isValidInput("", InputSelection.Track)).toBe(false);
  });
});

describe("determineUrlType helper function", () => {
  test("should return 'spotify' for valid spotify url", () => {
    expect(
      determineUrlType("https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i")
    ).toBe("spotify");
  });
  test("should return null for invalid spotify url", () => {
    expect(
      determineUrlType("https://open.spotify.com/dasdsa/2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
    expect(
      determineUrlType("https://www.random.com/dasdsa/2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
  });

  test("should return 'deezer' for valid deezer url", () => {
    expect(
      determineUrlType("https://www.deezer.com/track/2SGBEDwsOAOAHrrdAd304i")
    ).toBe("deezer");
  });
  test("should return null for invalid deezer url", () => {
    expect(
      determineUrlType("https://www.deezer.com/dasdsa/2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
    expect(
      determineUrlType("https://www.random.com/dasdsa/2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
  });

  test("should return 'youtube' for valid youtube url", () => {
    expect(
      determineUrlType("https://www.youtube.com/watch?v=2SGBEDwsOAOAHrrdAd304i")
    ).toBe("youtube");
  });
  test("should return null for invalid youtube url", () => {
    expect(
      determineUrlType("https://www.youtube.com/watch?t=2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
    expect(
      determineUrlType("https://www.random.com/dasdsa/2SGBEDwsOAOAHrrdAd304i")
    ).toBe(null);
  });
});

describe("getTrackId helper function", () => {
  test("should return valid id given valid spotify url", () => {
    expect(
      getTrackId(
        "https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i",
        "spotify"
      )
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });
  test("should return null given invalid spotify url", () => {
    expect(getTrackId("https://open.spotify.com/dasdsa", "spotify")).toBe(null);
  });

  test("should return valid id given valid deezer url", () => {
    expect(
      getTrackId(
        "https://www.deezer.com/track/2SGBEDwsOAOAHrrdAd304i",
        "deezer"
      )
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });
  test("should return null given invalid deezer url", () => {
    expect(getTrackId("https://www.deezer.com/dasdsa", "spotify")).toBe(null);
  });

  test("should return valid id given valid youtube url", () => {
    expect(
      getTrackId(
        "https://www.youtube.com/watch?v=2SGBEDwsOAOAHrrdAd304i",
        "youtube"
      )
    ).toBe("2SGBEDwsOAOAHrrdAd304i");
  });
  test("should return null given invalid youtube url", () => {
    expect(
      getTrackId(
        "https://www.youtube.com/watch?t=2SGBEDwsOAOAHrrdAd304i",
        "spotify"
      )
    ).toBe(null);
  });
});
