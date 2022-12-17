import { InputSelection } from "@constants/input";
import { isValidInput } from "./url";

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
